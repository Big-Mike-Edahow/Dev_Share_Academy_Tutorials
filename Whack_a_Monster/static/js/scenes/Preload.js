// Preload.js

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  editorPreload() {
    this.load.pack("asset-pack", "static/data/asset-pack.json");
  }

  editorCreate() {
    // Guapen.
    const guapen = this.add.image(325, 300, "guapen");
    guapen.scaleX = 0.32715486817515643;
    guapen.scaleY = 0.32715486817515643;

    // Progress Bar.
    const progressBar = this.add.rectangle(400, 300, 256, 20);
    progressBar.setOrigin(0, 0);
    progressBar.isFilled = true;
    progressBar.fillColor = 14737632;

    // Progress Bar Background.
    const progressBarBg = this.add.rectangle(400, 300, 256, 20);
    progressBarBg.setOrigin(0, 0);
    progressBarBg.fillColor = 14737632;
    progressBarBg.isStroked = true;

    // Loading Text.
    const loadingText = this.add.text(400, 320, "", {});
    loadingText.text = "Loading...";
    loadingText.setStyle({
      color: "#e0e0e0",
      fontFamily: "arial",
      fontSize: "20px",
    });

    this.progressBar = progressBar;
    this.events.emit("scene-awake");
  }

  // Global scope variable.
  progressBar;

  preload() {
    this.editorCreate();
    this.editorPreload();

    const width = this.progressBar.width;

    this.plugins.get("rexwebfontloaderplugin").addToScene(this);
    this.load.rexWebFont({
      custom: {
        families: ["Nosifer", "Creepster"],
        urls: ["static/fonts/fonts.css"],
      },
    });

    this.load.on("progress", (progress) => {
      this.progressBar.width = progress * width;
    });
  }

  create() {
    this.scene.start("Level");
  }
}
