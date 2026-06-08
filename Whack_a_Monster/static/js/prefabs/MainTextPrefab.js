// MainTextPrefab.js

export default class MainTextPrefab extends Phaser.GameObjects.Text {
  constructor(scene, x, y) {
    super(scene, x ?? 0, y ?? 0, "", {});

    this.setOrigin(0.5, 0.5);
    this.text = "Placeholder";
    this.setStyle({
      align: "center",
      fontFamily: "Nosifer",
      fontSize: "128px",
    });
  }
}
