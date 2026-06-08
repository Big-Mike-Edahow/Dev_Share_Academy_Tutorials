// Boot.js

export default class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "static/data/preload-asset-pack.json");
  }

  create() {
    this.scene.start("Preload");
  }
}
