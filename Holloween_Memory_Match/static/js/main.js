// main.js

import Boot from "./scenes/Boot.js";
import Preload from "./scenes/Preload.js";
import Title from "./scenes/Title.js";
import Level from "./scenes/Level.js";
import UI from "./scenes/UI.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-canvas",
    width: 1000,
    height: "95%",
    pixelArt: false,
    backgroundColor: "#242424",
    scene: [Boot, Preload, Title, Level, UI],
    title: "Halloween Memory Match",
    version: "1.0",
    description: "A fun card matching game.",
  };

  new Phaser.Game(config);
}

main();
