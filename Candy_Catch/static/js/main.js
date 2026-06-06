// main.js

import TitleScene from "./scenes/TitleScene.js";
import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-canvas",
    width: 800,
    height: '95%',
    backgroundColor: "#000000",
    pixelArt: false,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          x: 0,
          y: 200,
        },
        debug: false,
      },
    },
    scene: [TitleScene, GameScene, GameOverScene],
    title: "Candy Catch",
    version: "1.0",
    description: "A fun candy catching game.",
  };

  new Phaser.Game(config);
}

main();
