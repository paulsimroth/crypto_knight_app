'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { getChainInfo } from '@/lib/blockchain/web3-config';

function NetworkSwitch() {
    const { chains, switchChain } = useSwitchChain();
    const { chainId } = useAccount();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {chainId ? getChainInfo(chainId).name : "Networks"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Available Networks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {chains.map((chain) => (
                    <DropdownMenuItem key={chain.id}>
                        <button onClick={() => switchChain({ chainId: chain.id })}>
                            {chain.name}
                        </button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default NetworkSwitch;