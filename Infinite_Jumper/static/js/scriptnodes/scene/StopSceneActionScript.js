// StopSceneActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class StopSceneActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }
  // Class fields.
  sceneKey = "";

  execute() {
    /** @type {Phaser.Scene} */
    const _scene = this.scene;
    _scene.scene.stop(this.sceneKey);
  }
}
