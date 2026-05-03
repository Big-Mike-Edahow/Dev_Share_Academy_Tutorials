// BlockPrefab.js

export default class BlockPrefab extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "tile", frame);

    this.scaleX = 5;
    this.scaleY = 5;
    scene.physics.add.existing(this, false);
    this.body.pushable = false;
    this.body.immovable = true;
    this.body.setSize(18, 18, false);
  }
}
