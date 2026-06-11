// StartSceneActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class StartSceneActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  sceneKey = "";

  execute() {
    const _scene = this.scene;
    _scene.scene.start(this.sceneKey);
  }
}
