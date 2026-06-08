// WolfPrefab.js

import BaseMonsterPrefab from "./BaseMonsterPrefab.js";

export default class WolfPrefab extends BaseMonsterPrefab {
  constructor(parent) {
    super(parent);

    // Prefab fields.
    this.points = 30;
    this.duration = 1900;
    this.textureConfig = { key: "spritesheet", frame: "Werewolf1.png" };
    this.animationKey = "idleWerewolf";
  }
}
