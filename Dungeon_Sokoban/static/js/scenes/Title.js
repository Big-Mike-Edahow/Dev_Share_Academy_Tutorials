// Title.js

import GameTextPrefab from "../prefabs/GameTextPrefab.js";
import SceneTransitionScript from "../scripts/SceneTransitionScript.js";

export default class Title extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  // Class fields.
  sceneTransitionScript;

  create() {
    // Initialize the level registry.
    this.registry.set("level", 1);

    // Title.
    const title = this.add.image(0, -16, "title");
    title.scaleX = 4;
    title.scaleY = 4;
    title.setOrigin(0, 0);

    // Title text.
    const titleText = new GameTextPrefab(this, 320, 180);
    this.add.existing(titleText);
    titleText.text = "🔥 SOKO 🔥\n\n💀 DUNGEON 💀";
    titleText.setStyle({});

    // Click to start text.
    const clickToStartText = new GameTextPrefab(this, 320, 384);
    this.add.existing(clickToStartText);
    clickToStartText.text = "CLICK TO START";
    clickToStartText.setStyle({ fontSize: "24px" });

    // Scene transition script.
    const sceneTransitionScript = new SceneTransitionScript(this);
    this.sceneTransitionScript = sceneTransitionScript;

    this.events.emit("scene-awake");

    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.sceneTransitionScript.fadeOutScene(() => {
        this.scene.start("Level1");
      });
    });
  }
}
