// SokobanUtils.js

/**
 * @typedef SokobanTileMapLayers
 * @type {object}
 * @property {Phaser.Tilemaps.TilemapLayer} wall
 * @property {Phaser.Tilemaps.TilemapLayer} floor
 * @property {Phaser.Tilemaps.TilemapLayer} player
 * @property {Phaser.Tilemaps.TilemapLayer} block
 * @property {Phaser.Tilemaps.TilemapLayer} goal
 * @property {Phaser.Tilemaps.TilemapLayer} blocking
 */

import { TILE_TYPES } from "./SokobanGame.js";

export function createMapFromTilemapLayers(tilemapLayers) {
  const layers = {
    wall: tilemapLayers.wall,
    floor: tilemapLayers.floor,
    player: tilemapLayers.player,
    block: tilemapLayers.block,
    goal: tilemapLayers.goal,
    blocking: tilemapLayers.blocking,
  };
  const missingLayers = Object.entries(layers).filter(
    ([name, layer]) => !layer,
  );
  if (missingLayers.length > 0) {
    console.warn("Missing required tilemap layers");
    return;
  }

  const mapData = Array(layers.player.layer.height)
    .fill()
    .map(() => Array(layers.player.layer.width).fill(TILE_TYPES.EMPTY));
  processLayerData(layers.wall, mapData, TILE_TYPES.BLOCKED);
  processLayerData(layers.floor, mapData, TILE_TYPES.FLOOR);
  processLayerData(layers.player, mapData, TILE_TYPES.PLAYER);
  processLayerData(layers.block, mapData, TILE_TYPES.BOX);
  processLayerData(layers.goal, mapData, TILE_TYPES.GOAL);
  processLayerData(layers.blocking, mapData, TILE_TYPES.BLOCKED);
  return mapData;
}

function processLayerData(layer, mapData, tileType) {
  const layerData = layer.layer.data;
  for (let y = 0; y < layerData.length; y++) {
    for (let x = 0; x < layerData[y].length; x++) {
      const tile = layerData[y][x];
      if (tile !== undefined && tile.index !== -1) {
        mapData[y][x] = tileType;
      }
    }
  }
}
