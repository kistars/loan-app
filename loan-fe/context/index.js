import { createContext, useContext } from "react";
import { useAccount } from "wagmi";

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
    const { address, } = useAccount();
    return <LoanContext.Provider
        value={{
            address
        }}
    >
        {children}
    </LoanContext.Provider>
}


export const useLoanContext = () => useContext(LoanContext);