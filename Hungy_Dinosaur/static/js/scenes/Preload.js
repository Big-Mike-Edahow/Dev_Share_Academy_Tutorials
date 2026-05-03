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
    const guapen = this.add.image(300, 290, "guapen");
    guapen.scaleX = 0.33;
    guapen.scaleY = 0.33;

    // Progress bar.
    const progressBar = this.add.rectangle(380, 290, 256, 20);
    progressBar.setOrigin(0, 0);
    progressBar.isFilled = true;
    progressBar.fillColor = 14737632;

    // Progress bar background.
    const progressBarBg = this.add.rectangle(380, 290, 256, 20);
    progressBarBg.setOrigin(0, 0);
    progressBarBg.fillColor = 14737632;
    progressBarBg.isStroked = true;

    // Loading text.
    const loadingText = this.add.text(380, 290, "", {});
    loadingText.text = "Loading...";
    loadingText.setStyle({
      color: "#e0e0e0",
      fontFamily: "arial",
      fontSize: "20px",
    });

    this.progressBar = progressBar;
    this.events.emit("scene-awake");
  }

  // Variable declarations.
  progressBar;

  preload() {
    this.editorCreate();
    this.editorPreload();

    const width = this.progressBar.width;
    this.load.on("progress", (progress) => {
      this.progressBar.width = progress * width;
    });
  }

  create() {
    this.scene.start("Title");
  }
}
