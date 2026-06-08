// BatPrefab.js

import BaseMonsterPrefab from "./BaseMonsterPrefab.js";

export default class BatPrefab extends BaseMonsterPrefab {
  constructor(parent) {
    super(parent);

    // Prefab fields.
    this.points = 40;
    this.duration = 1500;
    this.textureConfig = { key: "spritesheet", frame: "Bat1.png" };
    this.animationKey = "idleBat";
  }
}
