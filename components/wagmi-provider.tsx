'use client';

import { wagmiConfig } from "@/lib/blockchain/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

function WagmiClientWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default WagmiClientWrapper;