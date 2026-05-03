// FoodPrefab.js

export default class FoodPrefab extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "guapen", frame);

    this.scaleX = 0.4;
    this.scaleY = 0.4;
    scene.physics.add.existing(this, false);
    this.body.setSize(208, 240, false);
  }
}
