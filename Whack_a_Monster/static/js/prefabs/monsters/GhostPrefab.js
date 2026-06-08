// GhostPrefab.js

import BaseMonsterPrefab from "./BaseMonsterPrefab.js";

export default class GhostPrefab extends BaseMonsterPrefab {
  constructor(parent) {
    super(parent);

    // Prefab fields.
    this.points = 20;
    this.duration = 2000;
    this.textureConfig = { key: "spritesheet", frame: "Ghost1.png" };
    this.animationKey = "idleGhost";
  }
}
