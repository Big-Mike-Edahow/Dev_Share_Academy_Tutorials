// PlayAudio.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";

export default class PlayAudio extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  /** @type {string} */
  key = "";
  /** @type {boolean} */
  loop = false;

  start() {
    if (this.key === "") {
      return;
    }
    this.scene.sound.play(this.key, {
      loop: this.loop,
    });
  }
}
