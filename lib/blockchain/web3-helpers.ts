export function weiToEther(wei: BigInt | number | undefined): number {
    if (!wei) {
        return 0;
    }
    /**
     * Convert Wei to Ether.
     * @param wei The amount of Wei to convert.
     * @returns The equivalent amount in Ether.
     */
    const ether: number = Number(wei.toString()) / 10 ** 18;
    return ether;
};


export function formatEthAddress(address: string | undefined) {
    if (address) {
        const res = address.slice(0, 6) + '...' + address.slice(38, 42);
        return res;
    } else {
        return;
    }
};


export function formatUnixTimestamp(timestamp: string): string {
    // Convert timestamp string to number
    const unixTimestamp = parseInt(timestamp, 10);

    // Create a new Date object using the timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Construct the human-readable date string
    const readableDate = date.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ', ' + date.toLocaleTimeString('en');

    return readableDate;
};
