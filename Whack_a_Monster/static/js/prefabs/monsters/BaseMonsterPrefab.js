// BaseMonsterPrefab.js

import ScriptNode from "/static/js/scripts/ScriptNode.js";

export default class BaseMonsterPrefab extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  points = 0;
  duration = 0;
  textureConfig;
  animationKey = "";
}
