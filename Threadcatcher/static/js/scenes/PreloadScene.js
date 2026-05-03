// PreloadScene.js

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.image("background", "images/background.png");
    this.load.image("jar", "images/jar.png");

    this.load.atlas(
      "objects",
      "images/spritesheet.png",
      "data/spritesheet.json",
    );
  }

  create() {
    this.scene.start("GameScene");
  }
}
