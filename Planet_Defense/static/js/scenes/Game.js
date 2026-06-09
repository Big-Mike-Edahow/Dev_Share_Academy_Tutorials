// Game.js

import { ASSET_KEYS } from "../common/assets.js";

const DATA_KEYS = Object.freeze({
  ROTATION_SPEED: "ROTATION_SPEED",
});

export default class Game extends Phaser.Scene {
  // Class fields.
  #planet;
  #player;
  #playerAngle;
  #cursorKeys;
  #bulletGroup;
  #lastBulletFiredTime;
  #enemyGroup;
  #enemySpeed;
  #spawnDelay;
  #spawnTimer;
  #score;
  #destroyedEnemyGroup;
  #planetHealth;
  #lockInput;
  #scoreText;
  #planetHealthContainer;

  constructor() {
    super("Game");
  }

  create() {
    if (!this.input.keyboard) {
      return;
    }

    // Background.
    for (let i = 1; i < 4; i += 1) {
      this.add
        .sprite(0, 0, ASSET_KEYS[`BACKGROUND_${i}`], 0)
        .setOrigin(0)
        .setAlpha(0.4)
        .play(ASSET_KEYS[`BACKGROUND_${i}`])
        .setScale(1, 1.25);
    }

    // Planet.
    this.#planet = this.physics.add
      .sprite(this.scale.width / 2, this.scale.height / 2, ASSET_KEYS.PLANET, 0)
      .play(ASSET_KEYS.PLANET);
    this.#planet.body.setCircle(30, 18, 18);
    this.#planetHealth = 3;
    this.#planetHealthContainer = this.add.container(
      this.scale.width / 2,
      this.#planet.y + 50,
      [
        this.add.sprite(-18, 0, ASSET_KEYS.HEART, 0).play(ASSET_KEYS.HEART),
        this.add.sprite(0, 0, ASSET_KEYS.HEART, 0).play(ASSET_KEYS.HEART),
        this.add.sprite(18, 0, ASSET_KEYS.HEART, 0).play(ASSET_KEYS.HEART),
      ],
    );

    // Player's ship.
    this.#player = this.add.image(0, 0, ASSET_KEYS.SHIP, 0).setScale(1);
    this.#playerAngle = 0;
    this.#updatePlayerPosition();

    // Player's weapon.
    this.#bulletGroup = this.physics.add.group([]);
    this.#lastBulletFiredTime = 0;

    // Enemy group.
    this.#enemyGroup = this.physics.add.group([]);
    this.#destroyedEnemyGroup = this.add.group([], {
      classType: Phaser.GameObjects.Sprite,
    });
    this.physics.add.overlap(
      this.#bulletGroup,
      this.#enemyGroup,
      this.#handleBulletAndEnemyCollision,
      undefined,
      this,
    );
    this.physics.add.overlap(
      this.#planet,
      this.#enemyGroup,
      this.#handlePlanetAndEnemyCollision,
      undefined,
      this,
    );

    // Initial difficulty settings.
    this.#spawnDelay = 1250;
    this.#enemySpeed = 50;
    this.#spawnTimer = this.time.addEvent({
      delay: this.#spawnDelay,
      callback: this.#spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    // Increase difficulty every 10 seconds.
    this.time.addEvent({
      delay: 10000,
      callback: this.#increaseDifficulty,
      callbackScope: this,
      loop: true,
    });

    // Score.
    this.#score = 0;
    const scoreTextPrefix = this.add
      .text(10, 10, "Score: ", {
        fontSize: "16px",
      })
      .setDepth(2);
    this.#scoreText = this.add
      .text(
        scoreTextPrefix.x + scoreTextPrefix.displayWidth,
        scoreTextPrefix.y,
        this.#score.toString(10),
        {
          fontSize: "16px",
        },
      )
      .setDepth(2);

    // Input.
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
    this.#lockInput = false;

    this.cameras.main.fadeIn(500);
  }

  update(time) {
    if (this.#lockInput) {
      return;
    }

    // Rotate player around Earth.
    if (this.#cursorKeys.left.isDown) {
      this.#playerAngle -= 0.06;
    } else if (this.#cursorKeys.right.isDown) {
      this.#playerAngle += 0.06;
    }
    this.#updatePlayerPosition();

    // Fire bullet with spacebar.
    if (
      Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space) &&
      time > this.#lastBulletFiredTime + 200
    ) {
      this.#fireBullet();
      this.#lastBulletFiredTime = time;
    }
    // Clean up bullets that go off screen.
    this.#bulletGroup.getChildren().forEach((bullet) => {
      if (
        bullet.active &&
        (bullet.x < 0 ||
          bullet.x > this.scale.width ||
          bullet.y < 0 ||
          bullet.y > this.scale.height)
      ) {
        bullet.setActive(false).setVisible(false);
      }
    });

    // Handle enemy collisions and clear enemies when off screen.
    this.#enemyGroup.getChildren().forEach((enemy) => {
      if (enemy.x < -50 || enemy.x > 850 || enemy.y < -50 || enemy.y > 650) {
        enemy.setActive(false).setVisible(false);
        return;
      }
      // Rotate enemies that are visible.
      enemy.rotation += enemy.getData(DATA_KEYS.ROTATION_SPEED);
    });
  }
  // Use polar coordinates to position player.
  #updatePlayerPosition() {
    const x =
      this.scale.width / 2 +
      (this.#planet.displayHeight / 2) * Math.cos(this.#playerAngle);
    const y =
      this.scale.height / 2 +
      (this.#planet.displayHeight / 2) * Math.sin(this.#playerAngle);
    this.#player.setPosition(x, y);
    // Rotate to face outward
    this.#player.rotation = this.#playerAngle + Math.PI / 2;
  }

  // Create bullet from player's current position.
  #fireBullet() {
    const x = this.#player.x;
    const y = this.#player.y;
    // Shoot outward.
    const velocity = this.physics.velocityFromRotation(this.#playerAngle, 400);
    const bullet = this.#bulletGroup.getFirstDead(
      true,
      x,
      y,
      ASSET_KEYS.BULLET,
      0,
      true,
    );
    bullet
      .setActive(true)
      .setVisible(true)
      .play(ASSET_KEYS.BULLET, true)
      .setScale(1.5)
      .enableBody();
    bullet.setVelocity(velocity.x, velocity.y);
    bullet.setRotation(this.#player.rotation);
    this.sound.play(ASSET_KEYS.FX_SHOT, { volume: 0.1 });
  }

  // Spawn enemies randomly from screen edges.
  #spawnEnemy() {
    let x = 0;
    let y = 0;
    const edge = Phaser.Math.Between(0, 3);
    if (edge === 0) {
      x = 0;
      y = Phaser.Math.Between(0, this.scale.height);
    } else if (edge === 1) {
      x = 800;
      y = Phaser.Math.Between(0, this.scale.height);
    } else if (edge === 2) {
      x = Phaser.Math.Between(0, this.scale.width);
      y = 0;
    } else {
      x = Phaser.Math.Between(0, this.scale.width);
      y = 600;
    }

    const enemy = this.#enemyGroup.getFirstDead(
      true,
      x,
      y,
      ASSET_KEYS.ASTEROID,
      0,
      true,
    );
    enemy
      .setActive(true)
      .setVisible(true)
      .enableBody()
      .setScale(Phaser.Math.FloatBetween(0.75, 1.25))
      .setData(DATA_KEYS.ROTATION_SPEED, Phaser.Math.FloatBetween(-0.02, 0.02));
    // Move toward Earth.
    this.physics.moveTo(
      enemy,
      this.scale.width / 2,
      this.scale.height / 2,
      this.#enemySpeed,
    );
    // Update physics body size to match asteroid size.
    enemy.body.setSize(enemy.displayWidth * 0.3, enemy.displayHeight * 0.3);
  }

  // Increase spawn rate (decrease delay) until min spawn delay value.
  #increaseDifficulty() {
    if (this.#spawnDelay > 500) {
      // Decrease delay by 50ms.
      this.#spawnDelay -= 50;
      // Remove the old event and add a new one with the updated delay.
      this.#spawnTimer.destroy();
      this.#spawnTimer = this.time.addEvent({
        delay: this.#spawnDelay,
        callback: this.#spawnEnemy,
        callbackScope: this,
        loop: true,
      });
    }

    // Increase enemy speed by 10, up to max speed of 200.
    if (this.#enemySpeed < 200) {
      this.#enemySpeed += 10;
    }
  }

  // Handle bullet hitting enemy.
  #handleBulletAndEnemyCollision(bullet, enemy) {
    bullet.disableBody();
    bullet.setActive(false).setVisible(false);
    enemy.disableBody();
    enemy.setActive(false).setVisible(false);
    this.#score++;
    this.#scoreText.setText(this.#score.toString(10));

    this.#spawnDestroyedEnemy(enemy.x, enemy.y);
  }

  // Spawn destroyed enemy.
  #spawnDestroyedEnemy(x, y) {
    const asteroid = this.#destroyedEnemyGroup.getFirstDead(
      true,
      x,
      y,
      ASSET_KEYS.ASTEROID_EXPLODE,
      0,
      true,
    );
    asteroid.setActive(true).setVisible(true).play(ASSET_KEYS.ASTEROID_EXPLODE);
    asteroid.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      asteroid.setActive(false).setVisible(false);
    });
    this.sound.play(ASSET_KEYS.FX_EXPLOSION, { volume: 0.5 });
  }

  // Handle planet and enemy collision.
  #handlePlanetAndEnemyCollision(planet, enemy) {
    enemy.disableBody();
    enemy.setActive(false).setVisible(false);
    this.#spawnDestroyedEnemy(enemy.x, enemy.y);
    this.#damagePlanet();
  }

  // Handle damage to planet.
  #damagePlanet() {
    if (this.#planetHealth <= 0) {
      return;
    }

    this.#planetHealth--;
    this.#planetHealthContainer.getAt(this.#planetHealth).destroy();

    // Flash red.
    this.#planet.setTint(0xff0000);
    this.time.delayedCall(100, () => this.#planet.clearTint());

    this.tweens.add({
      targets: this.#planet,
      scaleX: 1.1,
      scaleY: 0.9,
      yoyo: true,
      duration: 100,
      ease: Phaser.Math.Easing.Quadratic.InOut,
    });
    this.cameras.main.shake(150, 0.02);

    this.sound.play(ASSET_KEYS.FX_HIT, { volume: 0.4 });

    // End game when Earth HP is 0.
    if (this.#planetHealth <= 0) {
      this.#lockInput = true;
      this.#player.setVisible(false);
      this.#planet.disableBody();
      this.#planet.setActive(false).setVisible(false);
      this.#spawnDestroyedEnemy(this.#planet.x, this.#planet.y);

      this.cameras.main.fadeOut(500);
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        () => {
          this.scene.start("GameOver", { score: this.#score });
        },
      );
    }
  }
}
