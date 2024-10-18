import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    holesky,
    sepolia,
    baseSepolia,
    localhost
} from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT;
export const config = getDefaultConfig({
    appName: "C2E Loan",
    projectId: projectId,
    chains: [sepolia, mainnet],
    ssr: true,
});
