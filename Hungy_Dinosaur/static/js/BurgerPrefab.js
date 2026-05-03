// BurgerPrefab.js

export default class BurgerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "burger_spritesheet", frame ?? 6);

    this.scaleX = 3;
    this.scaleY = 3;
    scene.physics.add.existing(this, false);
    this.body.setSize(32, 32, false);
    this.play("idleburger_spritesheet");
  }
}
