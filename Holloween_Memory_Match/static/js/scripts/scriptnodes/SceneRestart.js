// SceneRestart.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";

export default class SceneRestart extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  execute() {
    this.scene.scene.restart();
  }
}
