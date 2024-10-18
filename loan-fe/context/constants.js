import toast from "react-hot-toast";

const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
const notifyError = (msg) => toast.error(msg, { duration: 2000 });

export const LENDING_ABI = {};
export const LOAN_TOKEN_ABI = {};
export const COLLATERAL_TOKEN_ABI = {};

export function toWei(amount, decimals = 18) {
    const toWei = ethers.utils.parseUnits(amount, decimals);
    return toWei.toString();
  }
  
  export function toEth(amount, decimals = 18) {
    const toEth = ethers.utils.formatUnits(amount, decimals);
    return toEth.toString();
  }
  