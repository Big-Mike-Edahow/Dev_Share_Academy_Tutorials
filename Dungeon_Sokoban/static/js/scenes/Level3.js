// Level3.js

import GameTextPrefab from "../prefabs/GameTextPrefab.js";
import GameManagerScript from "../scripts/GameManagerScript.js";
import SceneTransitionScript from "../scripts/SceneTransitionScript.js";

export default class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
  }

  create() {
    // Title.
    this.add
      .text(320, 50, "☠️ Soko Dungeon ☠️", {
        color: "#d4d29b",
        fontFamily: "PressStart2P-Regular",
        fontSize: "32px",
        stroke: "#d4d29b",
        align: "center",
      })
      .setOrigin(0.5);

    // Editable tile map.
    this.cache.tilemap.add(
      "editabletilemap_a6154d9b-7c6a-4846-9869-084620d2c56a",
      {
        format: 1,
        data: {
          width: 12,
          height: 12,
          orientation: "orthogonal",
          tilewidth: 16,
          tileheight: 16,
          tilesets: [
            {
              columns: 14,
              margin: 0,
              spacing: 0,
              tilewidth: 16,
              tileheight: 16,
              tilecount: 224,
              firstgid: 1,
              image: "walls",
              name: "walls",
              imagewidth: 224,
              imageheight: 256,
            },
            {
              columns: 11,
              margin: 0,
              spacing: 0,
              tilewidth: 16,
              tileheight: 16,
              tilecount: 88,
              firstgid: 225,
              image: "animated_props",
              name: "animated_props",
              imagewidth: 176,
              imageheight: 128,
            },
            {
              columns: 7,
              margin: 0,
              spacing: 0,
              tilewidth: 16,
              tileheight: 16,
              tilecount: 63,
              firstgid: 313,
              image: "elf",
              name: "elf",
              imagewidth: 112,
              imageheight: 144,
            },
            {
              columns: 13,
              margin: 0,
              spacing: 0,
              tilewidth: 16,
              tileheight: 16,
              tilecount: 208,
              firstgid: 376,
              image: "grounds",
              name: "grounds",
              imagewidth: 208,
              imageheight: 256,
            },
            {
              columns: 19,
              margin: 0,
              spacing: 0,
              tilewidth: 16,
              tileheight: 16,
              tilecount: 152,
              firstgid: 584,
              image: "props",
              name: "props",
              imagewidth: 304,
              imageheight: 128,
            },
          ],
          layers: [
            {
              type: "tilelayer",
              name: "floorTileLayer",
              width: 12,
              height: 12,
              opacity: 1,
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 436, 438, 438, 438, 438, 439, 0, 0, 0, 0,
                0, 0, 449, 463, 463, 463, 463, 465, 0, 0, 0, 0, 0, 0, 449, 463,
                463, 463, 463, 465, 0, 0, 0, 0, 0, 0, 449, 463, 463, 463, 463,
                465, 0, 0, 0, 0, 0, 0, 475, 476, 476, 476, 476, 478, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
            },
            {
              type: "tilelayer",
              name: "wallTileLayer",
              width: 12,
              height: 12,
              opacity: 1,
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 4, 4, 4, 4, 4,
                4, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 2, 0, 0,
                0, 0, 0, 0, 32, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0,
                2, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 32, 0,
                0, 0, 0, 29, 30, 30, 30, 30, 30, 30, 46, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
            },
            {
              type: "tilelayer",
              name: "playerTileLayer",
              width: 12,
              height: 12,
              opacity: 1,
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 313, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
            },
            {
              type: "tilelayer",
              name: "blockTileLayer",
              width: 12,
              height: 12,
              opacity: 1,
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 605, 0,
                0, 605, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 605, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
            },
            {
              type: "tilelayer",
              name: "goalTileLayer",
              width: 12,
              height: 12,
              opacity: 1,
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 251, 0, 0, 0, 251, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 251, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
            },
            {
              type: "tilelayer",
              name: "blockingTileLayer",
              width: 12,
              height: 12,
              opacity: 1,
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 606,
                0, 0, 606, 0, 0, 0, 0, 0, 0, 0, 0, 0, 606, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
            },
          ],
        },
      },
    );

    const editabletilemap = this.add.tilemap(
      "editabletilemap_a6154d9b-7c6a-4846-9869-084620d2c56a",
    );
    editabletilemap.addTilesetImage("walls");
    editabletilemap.addTilesetImage("animated_props");
    editabletilemap.addTilesetImage("elf");
    editabletilemap.addTilesetImage("grounds");
    editabletilemap.addTilesetImage("props");

    // Wall tile layer.
    const wallTileLayer = editabletilemap.createLayer(
      "wallTileLayer",
      ["walls"],
      128,
      48,
    );
    wallTileLayer.scaleX = 2;
    wallTileLayer.scaleY = 2;

    // Floor tile layer.
    const floorTileLayer = editabletilemap.createLayer(
      "floorTileLayer",
      ["grounds"],
      128,
      48,
    );
    floorTileLayer.scaleX = 2;
    floorTileLayer.scaleY = 2;

    // Player tile layer.
    const playerTileLayer = editabletilemap.createLayer(
      "playerTileLayer",
      ["elf"],
      128,
      48,
    );
    playerTileLayer.scaleX = 2;
    playerTileLayer.scaleY = 2;

    // Block tile layer.
    const blockTileLayer = editabletilemap.createLayer(
      "blockTileLayer",
      ["props"],
      128,
      48,
    );
    blockTileLayer.scaleX = 2;
    blockTileLayer.scaleY = 2;

    // Goal tile layer.
    const goalTileLayer = editabletilemap.createLayer(
      "goalTileLayer",
      ["animated_props"],
      128,
      48,
    );
    goalTileLayer.scaleX = 2;
    goalTileLayer.scaleY = 2;

    // Blocking tile layer.
    const blockingTileLayer = editabletilemap.createLayer(
      "blockingTileLayer",
      ["props"],
      128,
      48,
    );
    blockingTileLayer.scaleX = 2;
    blockingTileLayer.scaleY = 2;

    // Instructions container.
    const instructionsContainer = this.add.container(185, 460);

    // Arrow keys.
    const arrow_keys = this.add.image(0, 0, "arrow_keys");
    arrow_keys.scaleX = 2;
    arrow_keys.scaleY = 2;
    arrow_keys.setOrigin(0.5, 1);
    instructionsContainer.add(arrow_keys);

    // R key.
    const r_key = this.add.image(213, 0, "r_key");
    r_key.scaleX = 2;
    r_key.scaleY = 2;
    r_key.setOrigin(0.5, 1);
    instructionsContainer.add(r_key);

    // Move player text.
    const movePlayerText = new GameTextPrefab(this, 108, 0);
    movePlayerText.setOrigin(0.5, 1);
    movePlayerText.text = "MOVE\nPLAYER";
    movePlayerText.setStyle({ fontSize: "12px" });
    movePlayerText.setLineSpacing(5);
    instructionsContainer.add(movePlayerText);

    // Restart level text.
    const restartLevelText = new GameTextPrefab(this, 290, 0);
    restartLevelText.setOrigin(0.5, 1);
    restartLevelText.text = "RESTART\nLEVEL";
    restartLevelText.setStyle({ fontSize: "12px" });
    restartLevelText.setLineSpacing(5);
    instructionsContainer.add(restartLevelText);

    // Game manager script.
    const gameManagerScript = new GameManagerScript(this);

    // Scene transition script.
    const sceneTransitionScript = new SceneTransitionScript(this);

    // Game manager script.
    gameManagerScript.wallTileLayer = wallTileLayer;
    gameManagerScript.blockTileLayer = blockTileLayer;
    gameManagerScript.floorTileLayer = floorTileLayer;
    gameManagerScript.playerTileLayer = playerTileLayer;
    gameManagerScript.goalTileLayer = goalTileLayer;
    gameManagerScript.blockingTileLayer = blockingTileLayer;
    gameManagerScript.sceneTransitionScript = sceneTransitionScript;

    this.editabletilemap = editabletilemap;

    this.events.emit("scene-awake");
  }

  editabletilemap;
}
