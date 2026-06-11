// SceneOnPointerDownActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class SceneOnPointerDownActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  once = false;

  execute(...args) {
    const _scene = this.scene;

    const eventName = Phaser.Input.Events.POINTER_DOWN;
    if (this.once) {
      _scene.input.once(eventName, () => {
        this.executeChildren();
      });
      return;
    }

    _scene.input.on(eventName, () => {
      this.executeChildren();
    });
  }
}
