import { GAME_HEIGHT, GAME_WIDTH } from '../main';
import { event } from '@/lib/gtag';
import { Scene } from 'phaser';

export class StartScene extends Scene {

    constructor() {
        super('StartScene');
    }

    preload() {
        if (typeof window !== 'undefined') {
            this.load.setPath('assets');

            //Images loaded
            this.load.image("knight", "knight.png");
            this.load.image("background", "background.png");

            event("crypto_knights", "start_game", "game_loaded");
        }
    }

    create() {

        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background');

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3, 'Crypto Knight', {
            fontFamily: 'Arial Black', fontSize: 53, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const startButton = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 35, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            backgroundColor: '#0000FF',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.add.text(512, 490, 'Start your adventure to collect as many coins as you can!', {
            fontFamily: 'Arial Black', fontSize: 26, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        startButton.on('pointerdown', () => {
            event("crypto_knights", "start_game", "start_game");
            this.scene.start('EthGame');
        });
    }
}