// AudioPrefab.js

import ScriptNode from "/static/js/scripts/ScriptNode.js";

export default class AudioPrefab extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Customizable properties.
  audioKey = "";
  loop = false;

  execute() {
    if (this.audioKey === "") {
      return;
    }
    this.scene.sound.play(this.audioKey, {
      loop: this.loop,
    });
  }
}
