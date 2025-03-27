import { EthGame } from './scenes/EthGame';
import { AUTO, Game, Types } from "phaser";
import { StartScene } from './scenes/StartScene';

export const GAME_WIDTH = 1000;
export const GAME_HEIGHT = 600;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
export const phaserConfig: Types.Core.GameConfig = {
    type: AUTO,
    title: "Crypto Knight",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    pixelArt: true,
    parent: 'game-container',
    scale: {
        zoom: 1
    },
    scene: [
        StartScene,
        EthGame
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 720 }
        }
    },
    autoFocus: true,
    input: {
        keyboard: true,
        touch: true
    }
};

const StartGame = (parent: string, gameData?: { address: string, chainId: number }) => {
    if (typeof window !== 'undefined') {  // Ensure window is defined
        const game = new Game({ ...phaserConfig, parent });

        // Pass gameData to all scenes
        game.registry.set('gameData', gameData);

        return game;
    }
    return null;
}

export default StartGame;
