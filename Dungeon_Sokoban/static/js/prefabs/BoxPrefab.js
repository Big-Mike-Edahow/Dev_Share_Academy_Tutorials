//BoxPrefab.js

export default class BoxPrefab extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "props", frame ?? 21);

    this.scaleX = 2;
    this.scaleY = 2;
  }
}
