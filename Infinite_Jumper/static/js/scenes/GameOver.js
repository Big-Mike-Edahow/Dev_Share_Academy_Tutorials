// GameOver.js

import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  editorCreate() {
    // Game over text.
    const gameOverTextGameObject = this.add.text(30, 39, "", {});
    gameOverTextGameObject.text = "Game Over";
    gameOverTextGameObject.setStyle({
      fontFamily: "PressStart2P-Regular",
      fontSize: "20px",
    });

    // Score value text.
    const scoreValueTextGameObject = this.add.text(120, 122, "", {});
    scoreValueTextGameObject.text = "0";
    scoreValueTextGameObject.setStyle({
      fontFamily: "PressStart2P-Regular",
      fontSize: "10px",
    });

    // On awake action script.
    const onAwakeActionScript = new OnAwakeActionScript(this);

    // Fade effect camera action script.
    const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(
      onAwakeActionScript,
    );

    // Time event action script.
    const timeEventActionScript = new TimeEventActionScript(
      onAwakeActionScript,
    );

    // Fade effect camera action script 1.
    const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(
      timeEventActionScript,
    );

    // Start scene action script.
    const startSceneActionScript = new StartSceneActionScript(
      fadeEffectCameraActionScript_1,
    );

    // Fade effect camera action script.
    fadeEffectCameraActionScript.duration = 500;
    fadeEffectCameraActionScript.fadeEvent = "camerafadeincomplete";

    // Time event action script.
    timeEventActionScript.delay = 3000;

    // Fade effect camera action script 1.
    fadeEffectCameraActionScript_1.duration = 5000;
    fadeEffectCameraActionScript_1.fadeEvent = "camerafadeoutcomplete";

    // Start scene action script.
    startSceneActionScript.sceneKey = "Title";

    this.scoreValueTextGameObject = scoreValueTextGameObject;
    this.events.emit("scene-awake");
  }
  scoreValueTextGameObject;

  create() {
    this.editorCreate();
    const score = this.registry.get("score");
    this.scoreValueTextGameObject.setText(score);
  }
}
