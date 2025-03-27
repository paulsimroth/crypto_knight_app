'use client';
import { Suspense, useRef } from "react";
import Image from "next/image";
import { IRefPhaserGame } from "./eth_game/Game";
import dynamic from "next/dynamic";
import { useAccount, useBalance } from "wagmi";
import { getChainInfo } from "@/lib/blockchain/web3-config";
import { weiToEther } from "@/lib/blockchain/web3-helpers";

const EthGameComponent = dynamic(() => import('./eth_game/Game').then((mod) => mod.EthGameComponent), {
    ssr: false,
});

function GameComponent() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const { address, chainId } = useAccount();
    const balanceOf = useBalance({
        address: address,
        token: getChainInfo(chainId || 421614).tokenContract
    })

    return (
        <>
            <div className="w-full h-fit mt-8 hidden lg:flex flex-col items-center justify-center">
                {address && chainId == 421614 ? (
                    <Suspense fallback={<GameLoader />}>
                        <div className="border-8 border-secondary rounded-md">
                            <EthGameComponent ref={phaserRef} />
                        </div>
                    </Suspense>) : (
                    <GameLoader />
                )}
            </div>
            <div className="w-[80%] max-w-[1000px] h-fit min-h-[300px] lg:hidden flex flex-col items-center justify-center text-justify">
                <h2 className="text-left w-full text-2xl font-bold my-2">
                    Thank you for visiting Crypto Knights!
                </h2>
                <p className="w-full">
                    Please visit this page on Desktop. Currently there is no mobile version of this game available.
                </p>
                <p className="w-full">
                    You need a keyboard to play this game. Touch controls are in progress.
                </p>
            </div>
            <div className="w-[80%] max-w-[1000px]">
                <p>
                    Your current token balance: {balanceOf ? weiToEther(balanceOf.data?.value) : 0}
                </p>
            </div>
        </>
    );
}

export default GameComponent;


function GameLoader() {
    return (
        <div className="relative w-[1000px] h-[600px] bg-secondary border-8 border-secondary rounded-md p-1 flex items-center justify-center bg-[url('/assets/background.png')]">
            <Image
                src="/assets/knight.png"
                width={170}
                height={170}
                alt="Loader Knight"
                className="absolute animate-spin"
            />
        </div>
    );
}