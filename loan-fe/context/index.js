import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner, useEthersProvider } from '../provider/hooks';
import { ethers } from "ethers";
import toast from "react-hot-toast";
import {
    LENDING_ABI,
    LENDING_ADDRESS,
    LENDING_TOKEN_ADDRESS,
    LENDING_TOKEN_ABI,
    COLLATERAL_TOKEN_ABI,
    COLLATERAL_TOKEN_ADDRESS,
} from "./constants";

export const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
export const notifyError = (msg) => toast.error(msg, { duration: 2000 });



const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
    const { address, } = useAccount();
    const signer = useEthersSigner();
    const provider = useEthersProvider();

    /**
     * 添加代币到钱包中
     */
    const addToken = (tk) => {
        if (window.ethereum) {
            window.ethereum.request({
                method: 'wallet_watchAsset',
                params: tk,
            })
        }
    }
    /**
     * Loading时禁止操作
     */
    const [loading, setLoading] = useState(false)
    /**
     * 用户拥有的借贷代币数量
     * 区分借贷的数量
     */
    const [lTokenBalance, setLTokenBalance] = useState('0');
    /**
     * 用户拥有的抵押代币
     */
    const [cTokenBalance, setCTokenBalance] = useState('0');


    /**
     * 用户借贷的代币数量
     */
    const [lTokenAmount, setLTokenAmount] = useState('0')
    /**
     * 用户抵押的代币数量
     */
    const [cTokenAmount, setCTokenAmount] = useState('0')

    const getLendingContract = () => {
        return new ethers.Contract(LENDING_ADDRESS, LENDING_ABI, signer);
    }

    const getCTokenContract = () => {
        return new ethers.Contract(COLLATERAL_TOKEN_ADDRESS, COLLATERAL_TOKEN_ABI, signer);
    }
    const getLTokenContract = () => {
        return new ethers.Contract(LENDING_TOKEN_ADDRESS, LENDING_TOKEN_ABI, signer)
    }
    const deposit = async (amount) => {
        try {
            const lendingContract = getLendingContract();
            const cTokenContract = getCTokenContract();
            setLoading(true);
            const tx = await cTokenContract.approve(LENDING_ADDRESS, amount);
            await tx.wait();
            await lendingContract.depositCollateral(amount);
        } catch (e) {
            console.log(e)
            setLoading(false)
            notifyError('deposit error');
        }
        setLoading(false)
        return;
    }
    const loan = async (amount) => {
        try {
            const lendingContract = getLendingContract();
            setLoading(true);
            await lendingContract.borrow(amount);
        } catch (e) {
            console.log(e)
            setLoading(false);
            notifyError('loan error');
        }
        setLoading(false)
        return;
    }

    const repay = async (amount) => {
        try {
            const lendingContract = getLendingContract();
            const lTokenContract = getLTokenContract();
            setLoading(true);
            const tx = await lTokenContract.approve(LENDING_ADDRESS, amount);
            await tx.wait();
            await lendingContract.repay(amount);
        } catch (e) {
            console.log(e)
            setLoading(false);
            notifyError('repay error');
        }
        setLoading(false)
        return;
    }

    const faucet = async () => {
        try {
            const lendingContract = getLendingContract();
            lendingContract.faucet();
        } catch (e) {
            notifyError('faucet error');
        }
    }

    /**
     * 实时更新token当前balance
     */
    useEffect(() => {
        if (!provider || !address || !signer) return;
        const lendingContract = getLendingContract();
        const getCTokenBalance = async () => {
            const collateralTokenContract = getCTokenContract();
            // collateral token balance
            const ctb = await collateralTokenContract.balanceOf(address);
            const amount = ctb.toString();
            setCTokenBalance(amount)
        }
        const getLTokenBalance = async () => {
            const lendingTokenContract = getLTokenContract();
            // lending token balance
            const ltb = await lendingTokenContract.balanceOf(address);
            const amount = ltb.toString();
            setLTokenBalance(amount)
        }
        getCTokenBalance();
        getLTokenBalance();

        provider.on("block", getCTokenBalance)
        provider.on("block", getLTokenBalance)
        lendingContract.on("FaucetUsed", getCTokenBalance);


        return () => {
            provider.off("block", getCTokenBalance)
            provider.off("block", getLTokenBalance)
            lendingContract.off("FaucetUsed", getCTokenBalance)
        }
    }, [provider, address, signer, getCTokenContract, getCTokenContract, getLendingContract])

    /**
     * 实时更新用户抵押/借贷token的数量
     */
    useEffect(() => {
        if (!signer || !address) return;
        const lendingContract = getLendingContract();
        /**
         * 获取用户抵押的数量
         */
        const getCTokenAmount = async () => {
            const amount = await lendingContract.collateralBalances(address);
            setCTokenAmount(amount.toString());
        }
        lendingContract.on("CollateralDeposited", getCTokenAmount);

        /**
         * 获取用户借贷的数量
         */
        const getLTokenAmount = async () => {
            const amount = await lendingContract.debt(address);
            setLTokenAmount(amount.toString());
        }
        lendingContract.on("Borrowed", getLTokenAmount);
        lendingContract.on("Repaid", getLTokenAmount);

        getCTokenAmount();
        getLTokenAmount();

        return () => {
            lendingContract.off("CollateralDeposited", getCTokenAmount)
            lendingContract.off("Borrowed", getLTokenAmount)
            lendingContract.off("Repaid", getLTokenAmount);
        }
    }, [signer, address]);


    return <LoanContext.Provider
        value={{
            address,
            deposit,
            loan,
            faucet,
            repay,
            setLoading,
            addToken,
            lTokenBalance,
            cTokenBalance,
            lTokenAmount,
            cTokenAmount,
            loading
        }}
    >
        {children}
    </LoanContext.Provider>
}


export const useLoanContext = () => useContext(LoanContext);
