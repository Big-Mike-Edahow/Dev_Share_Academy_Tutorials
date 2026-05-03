// main.js

import PreloadScene from "./scenes/PreloadScene.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 580,
  backgroundColor: "#000000",
  parent: "game-canvas",
  pixelArt: false,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PreloadScene, GameScene],
  title: "Threadcatcher",
  version: "1.0",
};

const game = new Phaser.Game(config);
