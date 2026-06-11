// UI.js

export default class UI extends Phaser.Scene {
  constructor() {
    super("UI");
  }

  editorCreate() {
    // Score text.
    const scoreTextGameObject = this.add.text(235, 5, "", {});
    scoreTextGameObject.setOrigin(1, 0);
    scoreTextGameObject.text = "0";
    scoreTextGameObject.setStyle({ fontFamily: "PressStart2P-Regular" });

    this.scoreTextGameObject = scoreTextGameObject;
    this.events.emit("scene-awake");
  }

  scoreTextGameObject;

  create() {
    this.editorCreate();
  }

  updateScoreText(text) {
    this.scoreTextGameObject.setText(text);
  }
}
