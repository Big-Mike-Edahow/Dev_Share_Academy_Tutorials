// GameTextPrefab.js

export default class GameTextPrefab extends Phaser.GameObjects.Text {
  constructor(scene, x, y) {
    super(scene, x ?? 0, y ?? 0, "", {});

    this.setOrigin(0.5, 0.5);
    this.text = "PLACEHOLDER";
    this.setStyle({
      align: "center",
      color: "#d4d29b",
      fontFamily: "PressStart2P-Regular",
      fontSize: "40px",
      stroke: "#d4d29b",
    });
  }
}
