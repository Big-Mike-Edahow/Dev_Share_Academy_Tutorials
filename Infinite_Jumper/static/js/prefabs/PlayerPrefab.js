// PlayerPrefab.js

export default class PlayerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(
      scene,
      x ?? 0,
      y ?? 0,
      texture || "player",
      frame ?? "player-idle-1.png",
    );

    scene.physics.add.existing(this, false);
    this.body.checkCollision.up = false;
    this.body.setOffset(35, 20);
    this.body.setSize(11, 44, false);
    this.play("playerIdle");
  }
}
