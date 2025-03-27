import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, polygon, arbitrum, arbitrumSepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia, polygon, arbitrum, arbitrumSepolia],
    ssr: true,
    connectors: [
        injected(),
        metaMask(),
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [polygon.id]: http(),
        [arbitrum.id]: http(),
        [arbitrumSepolia.id]: http(),
    },
});