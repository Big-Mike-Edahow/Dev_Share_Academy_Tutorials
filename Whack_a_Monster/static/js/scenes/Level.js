// Level.js

import MainTextPrefab from "../prefabs/MainTextPrefab.js";
import SpawnerGroupPrefab from "../prefabs/SpawnerGroupPrefab.js";
import UiTextPrefab from "../prefabs/UiTextPrefab.js";
import TimerScriptPrefab from "../prefabs/TimerScriptPrefab.js";
import BatPrefab from "../prefabs/monsters/BatPrefab.js";
import JackPrefab from "../prefabs/monsters/JackPrefab.js";
import VampirePrefab from "../prefabs/monsters/VampirePrefab.js";
import WitchPrefab from "../prefabs/monsters/WitchPrefab.js";
import WolfPrefab from "../prefabs/monsters/WolfPrefab.js";
import GameplayScriptPrefab from "../prefabs/GameplayScriptPrefab.js";
import GhostPrefab from "../prefabs/monsters/GhostPrefab.js";
import AudioPrefab from "../prefabs/AudioPrefab.js";

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");
  }

  // Class fields.
  wolfPrefab;
  ghostPrefab;
  spawners;
  monsters;

  create() {
    // Background Layer.
    const backgroundLayer = this.add.layer();

    // Background.
    const background = this.add.image(0, 0, "background");
    background.setOrigin(0, 0).setDisplaySize(1000, 600);
    backgroundLayer.add(background);

    // Title Text Layer.
    const titleTextLayer = this.add.layer();

    // Title Text.
    const titleText = new MainTextPrefab(this, 500, 275);
    titleText.text = "Whack\nA\nMonster";
    titleTextLayer.add(titleText);

    // Game Over Text.
    const gameOverText = new MainTextPrefab(this, 500, 300);
    gameOverText.visible = false;
    gameOverText.text = "Game Over";
    titleTextLayer.add(gameOverText);

    // Monster Spawner Layer.
    const monsterSpawnerLayer = this.add.layer();

    // Top Spawner Group.
    const topSpawnerGroup = new SpawnerGroupPrefab(this, -100, 320);
    monsterSpawnerLayer.add(topSpawnerGroup);

    // Bottom Spawner Group.
    const bottomSpawnerGroup = new SpawnerGroupPrefab(this, -100, 520);
    bottomSpawnerGroup.visible = true;
    monsterSpawnerLayer.add(bottomSpawnerGroup);

    // UI Layer.
    const uiLayer = this.add.layer();
    uiLayer.visible = false;

    // Timer Text.
    const timerText = new UiTextPrefab(this, 800, 10);
    timerText.text = "30";
    uiLayer.add(timerText);

    // Timer Script Prefab.
    const timerScriptPrefab = new TimerScriptPrefab(timerText);

    // Score Text.
    const scoreText = new UiTextPrefab(this, 20, 10);
    scoreText.text = "0";
    uiLayer.add(scoreText);

    // Hourglass.
    const hourglass = this.add.image(900, 10, "hourglass");
    hourglass.setOrigin(0, 0);
    uiLayer.add(hourglass);

    // Bat Prefab.
    const batPrefab = new BatPrefab(this);

    // Jack Prefab.
    const jackPrefab = new JackPrefab(this);

    // Vampire Prefab.
    const vampirePrefab = new VampirePrefab(this);

    // Witch Prefab.
    const witchPrefab = new WitchPrefab(this);

    // Wolf Prefab.
    const wolfPrefab = new WolfPrefab(this);

    // Gameplay Script Prefab.
    const gameplayScriptPrefab = new GameplayScriptPrefab(this);

    // Ghost Prefab.
    const ghostPrefab = new GhostPrefab(this);

    // Background Audio.
    const backgroundAudio = new AudioPrefab(this);

    // Monster Destroyed Audio.
    const monsterDestroyedAudio = new AudioPrefab(this);

    // Lists.
    const spawners = [topSpawnerGroup, bottomSpawnerGroup];
    const monsters = [
      wolfPrefab,
      ghostPrefab,
      witchPrefab,
      vampirePrefab,
      jackPrefab,
      batPrefab,
    ];

    // Timer Script Prefab (prefab fields).
    timerScriptPrefab.seconds = 30;

    // Gameplay Script Prefab (prefab fields).
    gameplayScriptPrefab.uiLayer = uiLayer;
    gameplayScriptPrefab.titleTextGameObject = titleText;
    gameplayScriptPrefab.spawnerGroups = spawners;
    gameplayScriptPrefab.monsters = monsters;
    gameplayScriptPrefab.scoreTextGameObject = scoreText;
    gameplayScriptPrefab.gameOverTextGameObject = gameOverText;
    gameplayScriptPrefab.timerScript = timerScriptPrefab;
    gameplayScriptPrefab.backgroundMusicScript = backgroundAudio;
    gameplayScriptPrefab.monsterDestroyedAudioScript = monsterDestroyedAudio;

    // Background Audio (prefab fields).
    backgroundAudio.audioKey = "background_music";
    backgroundAudio.loop = true;

    // Monster Destroyed Audio (prefab fields).
    monsterDestroyedAudio.audioKey = "impactSoft_heavy_000";

    this.wolfPrefab = wolfPrefab;
    this.ghostPrefab = ghostPrefab;
    this.spawners = spawners;
    this.monsters = monsters;

    this.events.emit("scene-awake");
  }
}
