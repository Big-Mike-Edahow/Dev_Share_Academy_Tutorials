// Preload.js

import GameTextPrefab from "../prefabs/GameTextPrefab.js";
import SceneTransitionScript from "../scripts/SceneTransitionScript.js";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  // Class fields.
  progressBar;
  sceneTransitionScript;

  preload() {
    // Progress bar.
    const progressBar = this.add.rectangle(192, 230, 256, 20);
    progressBar.setOrigin(0, 0);
    progressBar.isFilled = true;
    progressBar.fillColor = 13947547;

    // Progress bar background.
    const progressBarBg = this.add.rectangle(192, 230, 256, 20);
    progressBarBg.setOrigin(0, 0);
    progressBarBg.fillColor = 13947547;
    progressBarBg.isStroked = true;

    // Game text prefab.
    const gameTextPrefab = new GameTextPrefab(this, 276, 208);
    this.add.existing(gameTextPrefab);
    gameTextPrefab.text = "LOADING...";
    gameTextPrefab.setStyle({ fontSize: "20px" });

    // Scene transition script.
    const sceneTransitionScript = new SceneTransitionScript(this);

    this.progressBar = progressBar;
    this.sceneTransitionScript = sceneTransitionScript;

    this.events.emit("scene-awake");

    this.load.pack("asset-pack", "static/data/asset-pack.json");

    const width = this.progressBar.width;

    this.load.on("progress", (progress) => {
      this.progressBar.width = progress * width;
    });
  }

  create() {
    this.sceneTransitionScript.fadeOutScene(() => {
      this.scene.start("Title");
    });
  }
}
