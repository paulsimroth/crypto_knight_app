'use client';
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Ban, Wallet } from "lucide-react";
import { event } from "@/lib/gtag";
import { Button } from "../ui/button";
import { formatEthAddress } from "@/lib/blockchain/web3-helpers";


function Connector() {

    const { connect } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: ensName } = useEnsName({ address });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="lg" variant={address ? "outline" : "default"}>
                    {address ? (
                        ensName ?? formatEthAddress(address)
                    ) : (
                        "Connect Wallet"
                    )}
                </Button>
            </DropdownMenuTrigger>

            {address ? (
                <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button onClick={() => (disconnect(), event('connect_wallet', 'type', 'disconnect'))} variant={"ghost"} className="flex items-center justify-start w-full gap-3">
                            <Ban className="text-destructive" />
                            <span>Disconnect</span>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            ) : (
                <DropdownMenuContent>
                    <DropdownMenuLabel>Connect your Wallet</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button onClick={() => (connect({
                            connector: metaMask()
                        }), event('connect_wallet', 'type', 'metamask'))} variant={"ghost"} className="flex items-center justify-start w-full gap-3">
                            <Image
                                src="/metamask_logo.svg"
                                alt="MetaMask"
                                width={35}
                                height={35}
                            />
                            <span>MetaMask</span>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={() => (connect({
                            connector: injected()
                        }), event('connect_wallet', 'type', 'injected'))} variant={"ghost"} className="flex items-center justify-start w-full gap-3">
                            <Wallet />
                            <span>Other</span>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    )
};

export default Connector;