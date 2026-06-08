// StartScene.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";

export default class StartScene extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  /** @type {string} */
  sceneName = "";

  execute() {
    if (this.sceneName === "") {
      return;
    }
    this.scene.scene.start(this.sceneName);
  }
}
