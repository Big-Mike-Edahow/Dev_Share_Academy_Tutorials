// main.js

import Preload from "./scenes/Preload.js";
import Title from "./scenes/Title.js";
import Level from "./scenes/Level.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-canvas",
  width: 800,
  height: 580,
  backgroundColor: "#242424",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [Preload, Title, Level],
  title: "Hungry Dinosaur",
  version: "1.0",
};

const game = new Phaser.Game(config);
