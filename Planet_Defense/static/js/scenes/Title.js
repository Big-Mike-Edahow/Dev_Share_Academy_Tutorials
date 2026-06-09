// Title.js

import { ASSET_KEYS } from '../common/assets.js';

export default class Title extends Phaser.Scene {
   constructor() {
    super("Title");
  }

  create() {
    // Background.
    for (let i = 1; i < 4; i += 1) {
      this.add
        .sprite(0, 0, ASSET_KEYS[`BACKGROUND_${i}`], 0)
        .setOrigin(0)
        .setAlpha(0.4)
        .play(ASSET_KEYS[`BACKGROUND_${i}`])
        .setScale(1, 1.25);
    }

    // Planet to defend.
    this.add.sprite(this.scale.width / 2, this.scale.height / 2, ASSET_KEYS.PLANET, 0).play(ASSET_KEYS.PLANET);

    this.add
      .text(this.scale.width / 2, 100, 'Planet Defense', {
        fontSize: '32px',
      })
      .setOrigin(0.5);

    this.add
      .text(this.scale.width / 2, 350, 'Click to play!', {
        fontSize: '22px',
      })
      .setOrigin(0.5);

    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.cameras.main.fadeOut(500);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start("Game");
      });
    });

    this.cameras.main.fadeIn(500);
  }
}
