// GameScene.js

export default class GameScene extends Phaser.Scene {
  cursorKeys;
  player;
  playerSpeed;
  fallingObjects;
  fallingObjectFrames;
  fallingObjectsSpeed;
  score;
  scoreTextGameObject;
  misses;
  maxMisses;
  isGameOver;
  timerEvent;
  livesTextGameObject;

  constructor() {
    super({ key: "GameScene" });
  }

  init() {
    this.playerSpeed = 500;
    this.fallingObjectsSpeed = 200;
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 3;
    this.isGameOver = false;
  }

  create() {
    if (!this.input) {
      console.warn("Input plugin is not available");
      return;
    }

    // Get scene width and height.
    const { width, height } = this.scale;

    // Add game background.
    this.add.image(width / 2, height / 2, "background");

    // Add player.
    this.player = this.add.image(width / 2, height, "jar").setDepth(1);

    // Support for keyboard input in our game (arrow keys, enter, and shift).
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // Keep track of the falling objects the player collects.
    this.fallingObjects = [];
    this.fallingObjectFrames = Object.keys(
      this.textures.get("objects").frames,
    ).filter(
      (name) => name !== "__BASE", // base is a default frame added by phaser
    );

    // Time event to spawn objects.
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.spawnFallingObject,
      callbackScope: this,
      loop: true,
    });

    // Text font-size and color.
    let textConfig = {
      fontSize: "40px",
      color: "#043D8C",
      stroke: "#ffffff",
      strokeThickness: 6,
    };

    // Player score.
    const scoreTextPrefix = this.add.text(10, 10, "Score:", textConfig);

    this.scoreTextGameObject = this.add.text(
      scoreTextPrefix.x + scoreTextPrefix.width,
      scoreTextPrefix.y,
      `${this.score}`,
      textConfig,
    );

    // Player lives.
    const livesTextPrefix = this.add.text(10, 50, "Lives:", textConfig);
    this.livesTextGameObject = this.add.text(
      livesTextPrefix.x + livesTextPrefix.width,
      livesTextPrefix.y,
      `${this.maxMisses - this.misses}`,
      textConfig,
    );
  }

  update(time, delta) {
    if (this.isGameOver) {
      return;
    }

    // Player movement.
    const moveStep = this.playerSpeed * (delta / 1000);
    if (this.cursorKeys.left.isDown) {
      this.player.x -= moveStep;
    } else if (this.cursorKeys.right.isDown) {
      this.player.x += moveStep;
    }

    // Prevents the player sprite from moving off the edge of the screen.
    if (this.player.x - this.player.displayWidth / 2 < 0) {
      this.player.x = this.player.displayWidth / 2;
    } else if (
      this.player.x + this.player.displayWidth / 2 >
      this.scale.width
    ) {
      this.player.x = this.scale.width - this.player.displayWidth / 2;
    }

    // Move the objects down the scree. Remove them when they are off screen.
    for (let i = this.fallingObjects.length - 1; i >= 0; i--) {
      const obj = this.fallingObjects[i];
      obj.y += this.fallingObjectsSpeed * (delta / 1000);

      // Check to see if an object overlaps with player.
      const overlapPoints = Phaser.Geom.Intersects.GetRectangleToRectangle(
        this.player.getBounds(),
        obj.getBounds(),
      );

      // Object is overlapping.
      if (overlapPoints.length > 0) {
        obj.destroy();
        this.fallingObjects.splice(i, 1);

        // Update players score for each object collected.
        this.score += 10;
        this.scoreTextGameObject.setText(`${this.score}`);
        continue;
      }

      // The object falls off the screen as the player misses the object.
      if (obj.y > this.scale.height) {
        obj.destroy();
        this.fallingObjects.splice(i, 1);
        this.misses += 1;
        this.livesTextGameObject.setText(`${this.maxMisses - this.misses}`);
      }
    }

    // If we have reached maxed misses, end the game.
    if (this.misses >= this.maxMisses) {
      this.handleGameOver();
    }
  }

  spawnFallingObject() {
    const randomFrame = Phaser.Utils.Array.GetRandom(this.fallingObjectFrames);
    const obj = this.add
      .image(
        Phaser.Math.RND.between(50, this.scale.width - 50),
        0,
        "objects",
        randomFrame,
      )
      .setScale(0.75);
    this.fallingObjects.push(obj);
  }

  handleGameOver() {
    this.isGameOver = true;
    this.timerEvent.remove();

    // Text font-size and color.
    let textConfig = {
      fontSize: "40px",
      color: "#043D8C",
      stroke: "#ffffff",
      strokeThickness: 6,
    };

    // Game Over text.
    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        "Game Over!",
        textConfig,
      )
      .setOrigin(0.5);
    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.restart();
    });
  }
}
