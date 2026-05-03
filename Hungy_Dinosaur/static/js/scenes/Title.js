// Title.js

export default class Title extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  editorCreate() {
    // Title text.
    const Title_Text = this.add.text(400, 290, "", {});
    Title_Text.setOrigin(0.5, 0.5);
    Title_Text.text = "Hungry Dinosaur! 🦖";
    Title_Text.setStyle({ fontSize: "64px" });

    this.events.emit("scene-awake");
  }

  create() {
    this.editorCreate();
    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start("Level");
    });
  }
}
