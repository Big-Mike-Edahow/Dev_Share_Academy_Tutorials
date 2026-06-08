// Preload.js

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  editorPreload() {
    this.load.pack("asset-pack", "static/data/asset-pack.json");
  }

  editorCreate() {
    // guapen
    const guapen = this.add.image(505.0120544433594, 360, "guapen");
    guapen.scaleX = 0.32715486817515643;
    guapen.scaleY = 0.32715486817515643;

    // progressBar
    const progressBar = this.add.rectangle(500, 300, 256, 20);
    progressBar.setOrigin(0, 0);
    progressBar.isFilled = true;
    progressBar.fillColor = 14737632;

    // progressBarBg
    const progressBarBg = this.add.rectangle(500, 300, 256, 20);
    progressBarBg.setOrigin(0, 0);
    progressBarBg.fillColor = 14737632;
    progressBarBg.isStroked = true;

    // loadingText
    const loadingText = this.add.text(500, 350, "", {});
    loadingText.text = "Loading...";
    loadingText.setStyle({
      color: "#e0e0e0",
      fontFamily: "arial",
      fontSize: "20px",
    });

    this.progressBar = progressBar;

    this.events.emit("scene-awake");
  }

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
  1;
}
