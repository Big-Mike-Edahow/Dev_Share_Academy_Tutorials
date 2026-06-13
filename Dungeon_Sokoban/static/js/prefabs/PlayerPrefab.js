// PlayerPrefab.js

export default class PlayerPrefab extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "elf", frame ?? 0);

    this.scaleX = 2;
    this.scaleY = 2;
    this.play("player_idle");
  }
}
