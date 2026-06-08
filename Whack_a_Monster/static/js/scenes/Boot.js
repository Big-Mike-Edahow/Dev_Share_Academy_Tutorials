// Boot.js

export default class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "static/data/preload-asset-pack.json");
    this.load.plugin({
      type: "plugin",
      key: "rexwebfontloaderplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js",
      start: true,
    });
  }

  create() {
    this.scene.start("Preload");
  }
}
