// main.js

import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import GameScene from "./scenes/GameScene.js";

function main() {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 450,
    height: "95%",
    parent: "game-canvas",
    backgroundColor: "#000000",
    roundPixels: true,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false,
      },
    },
    scene: [BootScene, PreloadScene, GameScene],
    title: "Space Shooter",
    version: "1.0",
    description: "A fun space shoot 'em up game.",
  });
}

main();

