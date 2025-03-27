export type ChainInfo = {
    name: string;
    tokenContract: `0x${string}`;
    specialItemContract: `0x${string}`;
    marketplaceAddress: `0x${string}`;
}

export type ChainData = {
    [chainId: number]: ChainInfo;
}