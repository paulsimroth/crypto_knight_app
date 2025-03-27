import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { event } from '@/lib/gtag';
import { GAME_HEIGHT, GAME_WIDTH } from '../main';
import { mintScore } from '@/service/mint-score';

type Knight = Phaser.Physics.Arcade.Sprite;
type TimerEvent = Phaser.Time.TimerEvent;

const OFF_SCREEN_TIMEOUT = 3000; // 3 seconds in milliseconds

// Variables changed by special items
const COIN_GENERATION_INTERVAL = 4000;
const PLAYER_SPEED_VARIABLE = 200;
const GAME_SECONDS = 1000;

export class EthGame extends Scene {
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    knight!: Knight;
    crates!: Phaser.Physics.Arcade.StaticGroup;
    coinTimer!: TimerEvent;
    coins!: Phaser.Physics.Arcade.Group;
    score: number = 0;
    scoreText!: Phaser.GameObjects.Text;
    secondsLeft: number = 60;
    timeLeftText!: Phaser.GameObjects.Text;
    timeLeftTimer!: TimerEvent;
    gameOver: boolean = false;
    coinsSent: boolean = false;
    offScreenTimer: TimerEvent | null = null;
    gameOverText: Phaser.GameObjects.Text | null = null;
    gameFinishedText: Phaser.GameObjects.Text | null = null;

    private address: `0x${string}` | undefined;
    private chainId: number | undefined;

    constructor() {
        super('EthGame');
    }

    preload() {
        if (typeof window !== 'undefined') {
            this.load.image("knight", "assets/knight.png");
            this.load.image("background", "assets/background.png");
            this.load.image("crate", "assets/crate.png");
            this.load.image("bitcoin", "assets/bitcoin.png");

            for (let i = 1; i <= 10; i++) {
                this.load.image(`knight_runFrame_${i}`, `assets/knight/run/Run (${i}).png`);
            }

            for (let i = 1; i <= 10; i++) {
                this.load.image(`knight_idleFrame_${i}`, `assets/knight/idle/Idle (${i}).png`);
            }
        }
    }

    create() {
        /**
         * BACKGROUND
         */
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "background");

        /**
         * KNIGHT
         */
        // Create knight
        this.knight = this.physics.add.sprite(100, 100, "knight");
        if (this.knight.body) {
            this.knight.body.setSize(400, 600);
        }
        this.knight.scaleX = 0.15;
        this.knight.scaleY = 0.15;

        /**
         * CRATES PLATFORMS
         */
        this.crates = this.physics.add.staticGroup();
        const floorPositions = [40, 120, 200, 280, 360, 440, 790];
        floorPositions.forEach(pos => this.crates.create(pos, 560, "crate"));
        const platformPositions = [
            [200, 280],
            [300, 360],
            [490, 460],
            [570, 400],
            [710, 510],
            [790, 300],
        ];
        platformPositions.forEach(pos => this.crates.create(pos[0], pos[1], "crate"));

        // Animations
        this.anims.create({
            key: "knight_run",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `knight_runFrame_${i + 1}` })),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: "knight_idle",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `knight_idleFrame_${i + 1}` })),
            frameRate: 10,
            repeat: 1
        });

        // Collider
        this.physics.add.collider(this.crates, this.knight);

        // Score and Time Text
        this.scoreText = this.add.text(6, 16, "Coin Bag: 0", { fontSize: "32px", color: "#000000" });
        this.createGameOverText();
        this.createGameFinishedText();
        this.timeLeftText = this.add.text(6, 56, `${this.secondsLeft} Seconds left`, { fontSize: "30px", color: "#000000" });

        // Keyboard inputs
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Timers
        this.coinTimer = this.time.addEvent({
            delay: COIN_GENERATION_INTERVAL,
            callback: this.generateCoins,
            callbackScope: this,
            loop: true
        });
        this.timeLeftTimer = this.time.addEvent({
            delay: GAME_SECONDS,
            callback: this.updateTimeLeft,
            callbackScope: this,
            repeat: -1
        });

        /**
         * WEB3 Data
         */
        const gameData = this.game.registry.get('gameData');
        if (gameData) {
            this.address = gameData.address;
            this.chainId = gameData.chainId;
        }

        EventBus.emit('current-scene-ready', this);
    }

    createGameOverText(): void {
        this.gameOverText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'GAME OVER', {
            fontFamily: 'Arial Black',
            fontSize: 53,
            color: '#ff0000',
            strokeThickness: 8,
            align: 'center',
            backgroundColor: '#990000',
            padding: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 }
        });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setScrollFactor(0);
        this.gameOverText.setDepth(1000); // Ensure it's on top of other game objects
        this.gameOverText.setVisible(false);
    }

    createGameFinishedText(): void {
        this.gameFinishedText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Congratulations!', {
            fontFamily: 'Arial Black',
            fontSize: 53,
            color: '#196619',
            strokeThickness: 8,
            align: 'center',
            backgroundColor: '#33cc33',
            padding: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 }
        });
        this.gameFinishedText.setOrigin(0.5);
        this.gameFinishedText.setScrollFactor(0);
        this.gameFinishedText.setDepth(1000); // Ensure it's on top of other game objects
        this.gameFinishedText.setVisible(false);
    }

    async updateTimeLeft() {
        if (this.secondsLeft <= 0) {
            this.physics.pause();
            this.gameOver = true;
            if (this.gameFinishedText) {
                this.gameFinishedText.setVisible(true);
            }
        }
        if (this.gameOver) {
            if (!this.coinsSent) {
                this.coinsSent = true;
                if (this.address && this.chainId) {
                    await mintScore(this.score, this.address, this.chainId);
                    event("crypto_knights", "main_game", "finished_mint", this.score);
                }
            }
            EventBus.emit('game_finished', this);
            return;
        }

        this.secondsLeft -= 1;
        this.timeLeftText.setText(`${this.secondsLeft} Seconds left`);
    }

    generateCoins() {
        this.coins = this.physics.add.group({
            key: "bitcoin",
            repeat: 1,
            setXY: {
                x: Phaser.Math.Between(0, GAME_WIDTH),
                y: -50,
                stepX: Phaser.Math.Between(30, 100)
            }
        });

        this.coins.children.iterate((child: Phaser.GameObjects.GameObject) => {
            const coin = child as Phaser.Physics.Arcade.Sprite;
            coin.setBounceY(Phaser.Math.FloatBetween(0.3, 1.5));
            return false;
        });

        this.physics.add.collider(this.coins, this.crates);
        this.physics.add.overlap(
            this.knight,
            this.coins,
            this.collectCoin as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this
        );
    }

    collectCoin(
        knight: Phaser.Physics.Arcade.Sprite,
        coin: Phaser.Physics.Arcade.Sprite
    ) {
        coin.disableBody(true, true);
        this.score++;
        this.scoreText.setText("Coin Bag: " + this.score);
    }


    checkKnightPosition(knight: Knight): void {
        const knightBounds = knight.getBounds();

        if (
            knightBounds.left > GAME_WIDTH ||
            knightBounds.right < 0 ||
            knightBounds.top > GAME_HEIGHT ||
            knightBounds.bottom < 0
        ) {
            // Knight is off-screen
            if (this.offScreenTimer === null) {
                this.offScreenTimer = this.time.delayedCall(OFF_SCREEN_TIMEOUT, () => {
                    console.log("Game over: Knight was off-screen for too long!");
                    event("crypto_knights", "main_game", "screen_exit_failed", this.score);
                    this.scene.pause();

                    if (this.gameOverText) {
                        this.gameOverText.setVisible(true);
                    }
                });
            }
        } else {
            // Knight is on-screen
            if (this.offScreenTimer !== null) {
                this.time.removeEvent(this.offScreenTimer);
                this.offScreenTimer = null;
            }
        }
    }

    update() {
        if (this.cursors.left.isDown) {
            this.knight.setVelocityX(-PLAYER_SPEED_VARIABLE);
            this.knight.play("knight_run", true);
            this.knight.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.knight.setVelocityX(PLAYER_SPEED_VARIABLE);
            this.knight.play("knight_run", true);
            this.knight.flipX = false;
        }
        else {
            this.knight.setVelocityX(0);
            this.knight.play("knight_idle", true);
        }

        if (this.cursors.up.isDown && this.knight.body && this.knight.body.touching.down) {
            this.knight.setVelocityY(-400);
        }

        if (this.cursors.space.isDown && this.knight.body && this.knight.body.touching.down) {
            this.knight.setVelocityY(-400);
        }

        // Check knight's position
        this.checkKnightPosition(this.knight);
    }
};