// Level.js

import FoodPrefab from "../FoodPrefab.js";
import BurgerPrefab from "../BurgerPrefab.js";
import BlockPrefab from "../BlockPrefab.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");
  }

  editorCreate() {
    // Up key.
    const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    // Down key.
    const downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
    );

    // Left key.
    const leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT,
    );

    // Right key.
    const rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    );

    // Dino.
    const dino = this.physics.add.image(400, 290, "dino");
    dino.scaleX = 0.5;
    dino.scaleY = 0.5;
    dino.body.collideWorldBounds = true;
    dino.body.setSize(250, 250, false);

    // Blueberry.
    const blueberry = new FoodPrefab(this, 725, 500);
    this.add.existing(blueberry);
    blueberry.scaleX = 0.3;
    blueberry.scaleY = 0.3;
    blueberry.tintTopLeft = 12502015;
    blueberry.tintTopRight = 12502015;
    blueberry.tintBottomLeft = 12502015;
    blueberry.tintBottomRight = 12502015;

    // Raspberry.
    const raspberry = new FoodPrefab(this, 75, 500);
    this.add.existing(raspberry);
    raspberry.scaleX = 0.3;
    raspberry.scaleY = 0.3;
    raspberry.tintTopLeft = 0xFFB7B7;
    raspberry.tintTopRight = 0xE53939;
    raspberry.tintBottomLeft = 0xDB1515;
    raspberry.tintBottomRight = 0x80444C;

    // Grape.
    const grape = new FoodPrefab(this, 400, 95);
    this.add.existing(grape);

    // Burger.
    const burger = new BurgerPrefab(this, 725, 75);
    this.add.existing(burger);

    // tile_01
    const tile_01 = new BlockPrefab(this, 200, 100);
    this.add.existing(tile_01);

    // tile_02
    const tile_02 = new BlockPrefab(this, 600, 100);
    this.add.existing(tile_02);

    // tile_03
    const tile_03 = new BlockPrefab(this, 200, 500);
    this.add.existing(tile_03);

    // tile_04
    const tile_04 = new BlockPrefab(this, 600, 500);
    this.add.existing(tile_04);

    // UI.
    const ui = this.add.layer();

    // ScoreText.
    const scoreText = this.add.text(10, 10, "", {});
    scoreText.text = "Score: 0";
    scoreText.setStyle({ fontSize: "24px" });
    ui.add(scoreText);

    // Arrays.
    const food = [blueberry, raspberry, grape, burger];
    const wall = [tile_04, tile_03, tile_02, tile_01];

    // Collider between dino and wall.
    this.physics.add.collider(dino, wall);

    // Collider between dino and food.
    this.physics.add.overlap(dino, food, this.eatFruit, undefined, this);
    this.dino = dino;
    this.scoreText = scoreText;
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.food = food;
    this.wall = wall;
    this.events.emit("scene-awake");
  }

  // Variable declarations.
  dino;
  scoreText;
  upKey;
  downKey;
  leftKey;
  rightKey;
  food;
  wall;
  playerVelocity = 200;
  score = 0;

  create() {
    this.editorCreate();
  }

  update() {
    // Check if the up key is pressed.
    if (this.upKey.isDown) {
      this.dino.setVelocityY(this.playerVelocity * -1);
    } else if (this.downKey.isDown) {
      this.dino.setVelocityY(this.playerVelocity);
    } else {
      this.dino.setVelocityY(0);
    }

    // Check if the down key is pressed.
    if (this.leftKey.isDown) {
      this.dino.setVelocityX(this.playerVelocity * -1);
    } else if (this.rightKey.isDown) {
      this.dino.setVelocityX(this.playerVelocity);
    } else {
      this.dino.setVelocityX(0);
    }
  }

  // Dino eats the fruit.
  eatFruit(dino, food) {
    food.disableBody();
    food.destroy();
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
