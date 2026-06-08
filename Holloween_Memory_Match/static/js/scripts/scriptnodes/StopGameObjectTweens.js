// StopGameObjectTweens.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";

export default class StopGameObjectTweens extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  /** @type {Phaser.GameObjects.GameObject[]} */
  targetGameObjects = [];

  execute() {
    /** @type {Phaser.Scene} */ (this.scene).tweens.killTweensOf(
      this.targetGameObjects,
    );
    this.executeChildren();
  }
}
