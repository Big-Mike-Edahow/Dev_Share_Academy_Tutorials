// main.js

import Boot from "./scenes/Boot.js";
import Preload from "./scenes/Preload.js";
import Level from "./scenes/Level.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-canvas",
    width: 1000,
    height: "95%",
    pixelArt: false,
    backgroundColor: "#242424",
    scene: [Boot, Preload, Level],
    title: "Whack a Monster",
    version: "1.0",
    description: "A fun monster whacking game.",
  };

  new Phaser.Game(config);
}

main();
