// UiTextPrefab.js

export default class UiTextPrefab extends Phaser.GameObjects.Text {
  constructor(scene, x, y) {
    super(scene, x ?? 0, y ?? 0, "", {});

    this.text = "Placeholder";
    this.setStyle({ fontFamily: "Creepster", fontSize: "64px" });
  }
}
