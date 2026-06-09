// Preload.js

import { ASSET_KEYS, AUDIO_ASSETS, IMAGE_ASSETS, SPRITESHEET_ASSETS } from '../common/assets.js';

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    SPRITESHEET_ASSETS.forEach((asset) => {
      this.load.spritesheet(asset.assetKey, asset.path, {
        frameWidth: asset.frameWidth,
        frameHeight: asset.frameHeight,
      });
    });
    IMAGE_ASSETS.forEach((asset) => {
      this.load.image(asset.assetKey, asset.path);
    });
    AUDIO_ASSETS.forEach((asset) => {
      this.load.audio(asset.assetKey, asset.path);
    });
  }

  create() {
    SPRITESHEET_ASSETS.forEach((asset) => {
      this.anims.create({
        key: asset.assetKey,
        frames: this.anims.generateFrameNumbers(asset.assetKey),
        frameRate: asset.frameRate,
        repeat: asset.repeat,
      });
    });
    this.sound.play(ASSET_KEYS.BACKGROUND_MUSIC, { volume: 0.5, loop: true });
    this.scene.start("Title");
  }
}
