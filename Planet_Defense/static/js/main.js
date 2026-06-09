// main.js

import Preload from "./scenes/Preload.js";
import Title from "./scenes/Title.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-canvas",
    width: 640,
    height: 450,
    backgroundColor: "#000000",
    pixelArt: true,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false,
      },
    },
    scene: [Preload, Title, Game, GameOver],
    title: "Planet Defense",
    version: "1.0",
    description: "Defend the planet from rogue asteroids.",
  };

  const game = new Phaser.Game(config);
}

main();
