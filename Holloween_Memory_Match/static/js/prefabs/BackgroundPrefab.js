// BackgroundPrefab.js

export default class BackgroundPrefab extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? -7, y ?? -28, texture || "background_1", frame);

    this.scaleX = 0.72;
    this.scaleY = 0.72;
    this.setOrigin(0, 0);
  }
}
