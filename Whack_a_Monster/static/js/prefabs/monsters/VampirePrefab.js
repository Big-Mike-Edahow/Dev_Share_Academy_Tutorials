// VampirePrefab.js

import BaseMonsterPrefab from "./BaseMonsterPrefab.js";

export default class VampirePrefab extends BaseMonsterPrefab {
  constructor(parent) {
    super(parent);

    // Prefab fields.
    this.points = 25;
    this.duration = 2100;
    this.textureConfig = { key: "spritesheet", frame: "Vampire1.png" };
    this.animationKey = "idleVampire";
  }
}
