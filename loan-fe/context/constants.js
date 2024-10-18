
import MOCKTOKEN from '../artifacts/contracts/MockToken.sol/MockToken.json';
import LENDING from '../artifacts/contracts/Loan.sol/LendingContract.json';
import { ethers } from 'ethers';


export const LENDING_ABI = LENDING.abi;
export const LENDING_ADDRESS = process.env.NEXT_PUBLIC_LENDING;
/**
 * 两个token的abi相同
 */
export const LENDING_TOKEN_ABI = MOCKTOKEN.abi;
export const COLLATERAL_TOKEN_ABI = MOCKTOKEN.abi;
export const LENDING_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_LENDING_TOKEN
export const COLLATERAL_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_COLLATERAL_TOKEN
/**
 * 抵押代币
 */
export const CTK = {
    type: 'ERC20',
    options: {
        address: COLLATERAL_TOKEN_ADDRESS,
        symbol: 'CTK',
        decimals: 18,
        // image: 'https://placekitten.com/200/300',
    },
}
/**
 * 借贷代币
 */
export const LTK = {
    type: 'ERC20',
    options: {
        address: LENDING_TOKEN_ADDRESS,
        symbol: 'LTK',
        decimals: 18,
        // image: 'https://placekitten.com/200/300',
    },
}

