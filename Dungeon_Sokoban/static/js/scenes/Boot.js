// Boot.js

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.setBaseURL("static/");
    this.load.pack("boot-asset-pack", "data/boot-asset-pack.json");
  }

  create() {
    this.events.emit("scene-awake");
    this.scene.start("Preload");
  }
}
