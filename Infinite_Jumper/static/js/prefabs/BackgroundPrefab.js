// BackgroundPrefab.js

export default class BackgroundPrefab extends Phaser.GameObjects.TileSprite {
  constructor(scene, x, y, width, height, texture, frame) {
    super(
      scene,
      x ?? 0,
      y ?? 0,
      width ?? 240,
      height ?? 176,
      texture || "background",
      frame,
    );

    this.setOrigin(0, 0);
    this.setScrollFactor(0);
  }
}
