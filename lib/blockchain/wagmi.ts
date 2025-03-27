import { http, createConfig } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
    chains: [arbitrumSepolia],
    ssr: true,
    connectors: [
        injected(),
        metaMask(),
    ],
    transports: {
        [arbitrumSepolia.id]: http(),
    },
});