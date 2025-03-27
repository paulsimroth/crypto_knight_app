import { TokenAbi } from "@/contracts/abis/TokenAbi";
import { wagmiConfig } from "@/lib/blockchain/wagmi";
import { getChainInfo } from "@/lib/blockchain/web3-config";
import { parseEther } from "viem";
import { writeContract } from '@wagmi/core';

export async function mintScore(score: number, address: `0x${string}`, chainId: number) {
    try {
        const tx = await writeContract(wagmiConfig, {
            address: getChainInfo(chainId).tokenContract,
            abi: TokenAbi,
            functionName: 'mint',
            args: [address, parseEther(score.toString())],
        });
        return tx;
    } catch (error) {
        console.error("Error minting tokens:", error);
        throw error;
    }
}