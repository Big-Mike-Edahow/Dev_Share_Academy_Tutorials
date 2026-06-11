// FadeEffectCameraActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class FadeEffectCameraActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  duration = 1000;
  fadeEvent = "camerafadeincomplete";

  execute() {
    const _scene = this.scene;
    const camera = _scene.cameras.main;
    if (this.fadeEvent === "camerafadeincomplete") {
      camera.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
        this.executeChildren();
      });
      camera.fadeIn(this.duration, 0, 0, 0);
      return;
    }
    camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.executeChildren();
    });
    camera.fadeOut(this.duration, 0, 0, 0);
  }
}
