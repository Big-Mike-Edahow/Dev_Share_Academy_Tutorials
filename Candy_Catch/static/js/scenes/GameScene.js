// GameScene.js

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    // Initialize variables.
    this.score = 0;

    // Background.
    this.add.image(0, 0, "background").setOrigin(0, 0);

    // Player basket.
    this.basket = this.physics.add.image(this.scale.width / 2, 630, "basket");
    this.basket.body.setAllowGravity(false).setCollideWorldBounds(true);

    // Input.
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // Candy group.
    this.candyFrames = this.textures.get("candy").getFrameNames();
    this.candyGroup = this.physics.add.group([]);

    // Time event to spawn candy.
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.spawnRandomCandy,
      callbackScope: this,
    });

    // Collision detection.
    this.physics.add.overlap(
      this.basket,
      this.candyGroup,
      this.handleBasketCandyCollision,
      null,
      this,
    );

    // UI.
    const scorePrefix = this.add.text(10, 10, "Score: ", {
      fontSize: "40px",
      color: "#043D8C",
      stroke: "#ffffff",
      strokeThickness: 6,
    });
    this.scoreText = this.add.text(scorePrefix.x + scorePrefix.width, 10, "0", {
      fontSize: "40px",
      color: "#043D8C",
      stroke: "#ffffff",
      strokeThickness: 6,
    });
    this.timerText = this.add.text(this.scale.width - 80, 10, "30", {
      fontSize: "60px",
      color: "#043D8C",
      stroke: "#ffffff",
      strokeThickness: 6,
    });

    // Is the game over?
    this.gameIsOver = false;
    this.timedEvent = this.time.delayedCall(
      30 * 1000,
      this.handleGameOver,
      [],
      this,
    );
    this.cameras.main.fadeIn(500);
  }

  update() {
    // Is the game over?
    if (this.gameIsOver) {
      this.basket.setVelocityX(0);
      return;
    }

    // Seconds remaining.
    this.timerText.setText(
      Math.round(this.timedEvent.getRemainingSeconds()).toString(10),
    );

    // Left and right basket movement.
    if (this.cursorKeys.left.isDown) {
      this.basket.setVelocityX(-400);
    } else if (this.cursorKeys.right.isDown) {
      this.basket.setVelocityX(400);
    } else {
      this.basket.setVelocityX(0);
    }

    // Hide candy objects that have fallen off the bottom of the screen.
    this.candyGroup.getChildren().forEach((child) => {
      if (!child.active) {
        return;
      }
      if (child.y > this.scale.height + 10) {
        child.setActive(false).setVisible(false);
      }
    });
  }

  // Spawn random candy.
  spawnRandomCandy() {
    const candy = this.candyGroup.getFirstDead(
      true,
      Phaser.Math.RND.between(50, this.scale.width - 50),
      -20,
      "candy",
    );
    candy
      .setScale(0.5)
      .setActive(true)
      .setVisible(true)
      .setVelocity(0)
      .setFrame(Phaser.Utils.Array.GetRandom(this.candyFrames))
      .enableBody();
  }

  // Handle basket and candy collision.
  handleBasketCandyCollision(basket, candy) {
    candy.disableBody(true, true);
    if (this.gameIsOver) {
      return;
    }
    this.score += 10;
    this.scoreText.setText(this.score.toString(10));
    console.log(this.score);
    this.sound.play("pop", {
      volume: 0.5,
    });
  }

  // Handle game over.
  handleGameOver() {
    this.gameIsOver = true;
    this.cameras.main.fadeOut(500);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start("GameOverScene", {
          score: this.score,
        });
      },
    );
  }
}
