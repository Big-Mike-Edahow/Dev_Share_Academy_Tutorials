// SceneClickHandler.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";

export default class SceneClickHandler extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  /** @type {boolean} */
  autoExecute = false;

  awake() {
    if (this.autoExecute) {
      this.scene.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
        this.executeChildren();
      });
    }
  }

  execute() {
    this.scene.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.executeChildren();
    });
  }
}
