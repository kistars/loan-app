'use client'
import { WagmiProvider } from "wagmi";
import { config } from '@/context/wagmiConfigs'
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from '@/components/Header';
import { LoanProvider } from '@/context'

export default function ClientProvider({ children }) {
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <Header />
                    <LoanProvider>
                        {children}
                    </LoanProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
