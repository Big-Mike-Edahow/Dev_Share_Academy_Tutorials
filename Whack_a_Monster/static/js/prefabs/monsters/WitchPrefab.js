// WitchPrefab.js

import BaseMonsterPrefab from "./BaseMonsterPrefab.js";

export default class WitchPrefab extends BaseMonsterPrefab {
  constructor(parent) {
    super(parent);

    // Prefab fields.
    this.points = 10;
    this.duration = 2500;
    this.textureConfig = { key: "spritesheet", frame: "Witch1.png" };
    this.animationKey = "idleWitch";
  }
}
