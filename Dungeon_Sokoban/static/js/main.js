// main.js

import Boot from "./scenes/Boot.js";
import Preload from "./scenes/Preload.js";
import Title from "./scenes/Title.js";
import Level1 from "./scenes/Level1.js";
import Level2 from "./scenes/Level2.js";
import Level3 from "./scenes/Level3.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: "game-canvas",
    backgroundColor: "#584422",
    pixelArt: true,
    zoom: 1.2,
    scene: [Boot, Preload, Title, Level1, Level2, Level3],
    title: "Dungeon Sokoban",
    version: "1.0",
    description: "A dungeon puzzle solving game.",
  };

  const game = new Phaser.Game(config);
}

main();

