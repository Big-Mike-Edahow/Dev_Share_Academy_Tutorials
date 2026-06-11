// main.js

import Preload from "./scenes/Preload.js";
import Title from "./scenes/Title.js";
import Level from "./scenes/Level.js";
import UI from "./scenes/UI.js";
import GameOver from "./scenes/GameOver.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 240,
    height: 176,
    zoom: 3,
    parent: "game-canvas",
    backgroundColor: "#000000",
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          x: 0,
          y: 300,
        },
        debug: false,
      },
    },
    scene: [Preload, Title, Level, UI, GameOver],
    title: "Infinite Jumper",
    version: "1.0",
    description: "An infinite jumper inspired by Super Metroid."
  };

  const game = new Phaser.Game(config);
}

main();
