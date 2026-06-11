// Level.js

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import LaunchSceneActionScript from "../scriptnodes/scene/LaunchSceneActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
import StopSceneActionScript from "../scriptnodes/scene/StopSceneActionScript.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");
  }

  editorCreate() {
    // Left keyboard key.
    const leftKeyboardKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT,
    );

    // Right keyboard key.
    const rightKeyboardKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    );

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
    levelLayer.add(rightWallTileSprite);

    // Player layer.
    const playerLayer = this.add.layer();

    // Player.
    const player = new PlayerPrefab(this, 120, -84);
    playerLayer.add(player);

    // Platform group prefab.
    const platformGroupPrefab = new PlatformGroupPrefab(this);
    this.add.existing(platformGroupPrefab);

    // On awake action script.
    const onAwakeActionScript = new OnAwakeActionScript(this);

    // Fade effect camera action script 1.
    const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(
      onAwakeActionScript,
    );

    // Launch scene action script.
    const launchSceneActionScript = new LaunchSceneActionScript(
      fadeEffectCameraActionScript_1,
    );

    // Time event action script for scene transition.
    const timeEventActionScriptForSceneTransition = new TimeEventActionScript(
      this,
    );

    // Fade effect camera action script.
    const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(
      timeEventActionScriptForSceneTransition,
    );

    // Start scene action script.
    const startSceneActionScript = new StartSceneActionScript(
      fadeEffectCameraActionScript,
    );

    // Stop scene action script.
    const stopSceneActionScript = new StopSceneActionScript(
      timeEventActionScriptForSceneTransition,
    );

    // Lists.
    const movingLevelTileSprites = [
      rightWallTileSprite,
      leftWallTileSprite,
      foregroundPrefab,
    ];
    const walls = [leftWallTileSprite, rightWallTileSprite];

    // Player with platforms collider.
    this.physics.add.collider(player, platformGroupPrefab.group);

    // Player with walls collider.
    this.physics.add.collider(player, walls);

    // Right wall tile sprite.
    rightWallTileSprite.tileOffsetY = -120;

    // Fade effect camera action script 1.
    fadeEffectCameraActionScript_1.duration = 500;
    fadeEffectCameraActionScript_1.fadeEvent = "camerafadeincomplete";

    // Launch scene action script.
    launchSceneActionScript.sceneKey = "UI";

    // Fade effect camera action script.
    fadeEffectCameraActionScript.duration = 500;
    fadeEffectCameraActionScript.fadeEvent = "camerafadeoutcomplete";

    // Start scene action script.
    startSceneActionScript.sceneKey = "GameOver";

    // Stop scene action script.
    stopSceneActionScript.sceneKey = "UI";

    this.player = player;
    this.platformGroupPrefab = platformGroupPrefab;
    this.timeEventActionScriptForSceneTransition =
      timeEventActionScriptForSceneTransition;
    this.leftKeyboardKey = leftKeyboardKey;
    this.rightKeyboardKey = rightKeyboardKey;
    this.movingLevelTileSprites = movingLevelTileSprites;
    this.walls = walls;

    this.events.emit("scene-awake");
  }

  player;
  platformGroupPrefab;
  timeEventActionScriptForSceneTransition;
  leftKeyboardKey;
  rightKeyboardKey;
  movingLevelTileSprites;
  walls;

  firstJumpMade = false;
  isGameOver = false;
  currentScore = 0;
  maxHeight = 0;
  startingMaxHeight = 0;
  level = 0;

  create() {
    this.editorCreate();
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
    this.cameras.main.setDeadzone(this.scale.width);
    this.firstJumpMade = false;
    this.isGameOver = false;
    this.currentScore = 0;
    this.maxHeight = 0;
    this.startingMaxHeight = 0;
    this.level = 0;
  }

  update() {
    const distance = Math.floor(Math.abs(this.player.body.bottom));
    const isTouchingDown = this.player.body.touching.down;
    if (isTouchingDown) {
      this.player.play("playerJump");
      this.player.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJump",
        () => {
          this.player.play("playerSpin");
        },
      );
      this.player.setVelocityY(-350);
      if (!this.firstJumpMade) {
        this.firstJumpMade = true;
        this.startingMaxHeight = distance;
      }
    }

    if (
      this.leftKeyboardKey.isDown &&
      !isTouchingDown &&
      this.firstJumpMade &&
      !this.isGameOver
    ) {
      this.player.setVelocityX(-150);
      this.player.setFlipX(true);
    } else if (
      this.rightKeyboardKey.isDown &&
      !isTouchingDown &&
      this.firstJumpMade &&
      !this.isGameOver
    ) {
      this.player.setVelocityX(150);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    this.movingLevelTileSprites.forEach((tileSprite) => {
      tileSprite.tilePositionY =
        this.player.y * 0.2 + (tileSprite.tileOffsetY || 0);
    });

    this.walls.forEach((tileSprite) => {
      if (tileSprite.flipX) {
        tileSprite.body.setOffset(16, this.cameras.main.worldView.y);
      } else {
        tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
      }
    });

    if (this.isGameOver) {
      this.player.setVelocityY(15);
      return;
    }
    if (distance > this.maxHeight && this.firstJumpMade) {
      this.maxHeight = distance;
      this.currentScore = Math.floor(
        (this.maxHeight - this.startingMaxHeight) / 10,
      );
      this.scene.get("UI").updateScoreText(this.currentScore);

      if (this.level === 0 && this.currentScore > 200) {
        this.platformGroupPrefab.enableMovingPlatforms = true;
      }
    }

    if (
      this.player.y >
      this.platformGroupPrefab.bottomMostPlatformYPosition + 50
    ) {
      this.isGameOver = true;
      this.player.play("playerHurt");
      this.player.setVelocityY(15);
      this.time.delayedCall(3000, () => {
        this.scene.start("GameOver");
      });
    }

    this.platformGroupPrefab.update();
  }
}
