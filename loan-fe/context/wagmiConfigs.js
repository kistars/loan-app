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
} from "wagmi/chains";

const localChain = {
    id: 31337, // 自定义链的ID
    name: 'Localhost',
    network: 'localhost',
    nativeCurrency: {
        decimals: 18,
        name: 'LocalEth',
        symbol: 'LETH',
    },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545'] },
        public: { http: ['http://127.0.0.1:8545'] },
    },
};

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT;
export const config = getDefaultConfig({
    appName: "C2E Loan",
    projectId: projectId,
    chains: [sepolia, localChain],
    ssr: true,
});
