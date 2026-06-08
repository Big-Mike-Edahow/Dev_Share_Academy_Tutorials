// JackPrefab.js

import BaseMonsterPrefab from "./BaseMonsterPrefab.js";

export default class JackPrefab extends BaseMonsterPrefab {
  constructor(parent) {
    super(parent);

    // Prefab fields.
    this.points = 30;
    this.duration = 1600;
    this.textureConfig = { key: "spritesheet", frame: "Jack o latern1.png" };
    this.animationKey = "idleJack";
  }
}
