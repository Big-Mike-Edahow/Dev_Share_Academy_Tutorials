// Title.js

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import TweenActionScript from "../scriptnodes/animation/TweenActionScript.js";
import SceneOnPointerDownActionScript from "../scriptnodes/scene/SceneOnPointerDownActionScript.js";
import CallbackActionScript from "../scriptnodes/utils/CallbackActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";

export default class Title extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  editorCreate() {
    // Level layer.
    const levelLayer = this.add.layer();

    // Background prefab.
    const backgroundPrefab = new BackgroundPrefab(this, 0, 0);
    levelLayer.add(backgroundPrefab);

    // Foreground prefab.
    const foregroundPrefab = new ForegroundPrefab(this, 0, 0);
    levelLayer.add(foregroundPrefab);

    // Left wall tile sprite.
    const leftWallTileSprite = new WallPrefab(this, 0, 0);
    levelLayer.add(leftWallTileSprite);

    // Right wall tile sprite.
    const rightWallTileSprite = new WallPrefab(this, 208, 0);
    rightWallTileSprite.flipX = true;
    rightWallTileSprite.flipY = false;
    rightWallTileSprite.tilePositionX = 0;
    rightWallTileSprite.tilePositionY = -120;
    levelLayer.add(rightWallTileSprite);

    // Ground.
    const ground = this.add.image(0, 144, "ground");
    ground.setOrigin(0, 0);
    levelLayer.add(ground);

    // Player layer.
    const playerLayer = this.add.layer();

    // Player.
    const player = new PlayerPrefab(this, 120, 136);
    playerLayer.add(player);

    // Title text.
    const titleTextGameObject = this.add.text(32, 15, "", {});
    titleTextGameObject.text = "Warped Cave\nEscape";
    titleTextGameObject.setStyle({
      align: "center",
      color: "#00ace1ff",
      fontFamily: "PressStart2P-Regular",
      stroke: "#00ffff",
      "shadow.offsetX": 3,
      "shadow.offsetY": 1,
      "shadow.stroke": true,
      "shadow.fill": true,
    });
    titleTextGameObject.setLineSpacing(3);

    // Click to play text.
    const clickToPlayTextGameObject = this.add.text(68, 81, "", {});
    clickToPlayTextGameObject.text = "Click to Play";
    clickToPlayTextGameObject.setStyle({
      color: "#59006eff",
      fontFamily: "PressStart2P-Regular",
      fontSize: "8px",
      stroke: "#000000",
    });

    // On awake action script.
    const onAwakeActionScript = new OnAwakeActionScript(this);

    // Fade effect camera action script.
    const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(
      onAwakeActionScript,
    );

    // Tween action script.
    const tweenActionScript = new TweenActionScript(onAwakeActionScript);

    // Scene on pointer down action script.
    const sceneOnPointerDownActionScript = new SceneOnPointerDownActionScript(
      onAwakeActionScript,
    );

    // Callback action script.
    const callbackActionScript = new CallbackActionScript(
      sceneOnPointerDownActionScript,
    );

    // Time event action script for scene transition.
    const timeEventActionScriptForSceneTransition = new TimeEventActionScript(
      this,
    );

    // Fade effect camera action script 1.
    const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(
      timeEventActionScriptForSceneTransition,
    );

    // Start scene action script.
    const startSceneActionScript = new StartSceneActionScript(
      fadeEffectCameraActionScript_1,
    );

    // Right wall tile sprite.
    rightWallTileSprite.tileOffsetY = -120;

    // Fade effect camera action script.
    fadeEffectCameraActionScript.duration = 500;
    fadeEffectCameraActionScript.fadeEvent = "camerafadeincomplete";

    // Tween action script.
    tweenActionScript.target = clickToPlayTextGameObject;
    tweenActionScript.duration = 1200;
    tweenActionScript.yoyo = true;
    tweenActionScript.repeat = -1;
    tweenActionScript.delay = 500;
    tweenActionScript.loopDelay = 500;
    tweenActionScript.tweenProperty = "alpha";
    tweenActionScript.tweenPropertyValue = 0.2;

    // Scene on pointer down action script.
    sceneOnPointerDownActionScript.once = true;

    // Callback action script.
    callbackActionScript.callback = () => {
      this.startGame();
    };

    // Fade effect camera action script 1.
    fadeEffectCameraActionScript_1.duration = 500;
    fadeEffectCameraActionScript_1.fadeEvent = "camerafadeoutcomplete";

    // Start scene action script.
    startSceneActionScript.sceneKey = "Level";

    this.player = player;
    this.timeEventActionScriptForSceneTransition =
      timeEventActionScriptForSceneTransition;

    this.events.emit("scene-awake");
  }

  player;
  timeEventActionScriptForSceneTransition;
  glowTween;

  create() {
    this.editorCreate();
    this.player.body.enable = false;
  }

  startGame() {
    this.player.stop();
    this.player.setFrame("player-duck.png");
    this.time.delayedCall(1000, () => {
      this.player.play("playerIdle");
      this.player.body.enable = true;
      this.player.body.velocity.y = -1000;
      this.timeEventActionScriptForSceneTransition.execute();
    });
  }
}
