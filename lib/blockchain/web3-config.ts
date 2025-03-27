import { ChainData, ChainInfo } from "@/types/Web3Types";

const chainData: ChainData = {
    421614: {
        name: "Arbitrum Sepolia",
        tokenContract: "0xCa7Db3644ba596205c41374162B7DD62e05b4615",
        specialItemContract: "0x9FF9Ca3a8421723c22aA8F9930d7377CE8d83b21",
        marketplaceAddress: "0x77d97e471e804494af0F8cFfd7e8B14C56E3f827"
    },
};

export function getChainInfo(chainId: number): ChainInfo {
    const chainInfo = chainData[chainId];
    if (!chainInfo) {
        throw new Error(`Chain with ID ${chainId} not found`);
    }
    return chainInfo;
}
