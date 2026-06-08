// UI.js

import FullScreenButtonPrefab from "../prefabs/FullScreenButtonPrefab.js";
import PlayAudio from "../scripts/scriptnodes/PlayAudio.js";

export default class UI extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  create() {
    // fullscreen0
    const fullscreen0 = new FullScreenButtonPrefab(this, 1238, 42);
    this.add.existing(fullscreen0);

    // playAudio
    const playAudio = new PlayAudio(this);

    // playAudio (prefab fields)
    playAudio.key = "background";
    playAudio.loop = true;

    this.events.emit("scene-awake");
  }
}
