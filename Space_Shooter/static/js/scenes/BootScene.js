// BootScene.js

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.json("animations_json", "static/data/animations.json");
  }

  create() {
    this.scene.start("PreloadScene");
  }
}
