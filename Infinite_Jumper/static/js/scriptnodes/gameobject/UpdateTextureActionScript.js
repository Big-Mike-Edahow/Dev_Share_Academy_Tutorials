// UpdateTextureActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class UpdateTextureActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  textureConfig;

  execute() {
    if (this.gameObject === undefined) {
      return;
    }
    if (this.textureConfig === undefined) {
      return;
    }
    this.gameObject.setTexture(this.textureConfig.key);
  }
}
