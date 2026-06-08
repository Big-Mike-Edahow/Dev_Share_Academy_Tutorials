// SpawnerPrefab.js

import BaseMonsterPrefab from "./monsters/BaseMonsterPrefab.js";

export default class SpawnerPrefab extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x ?? 0, y ?? 0);

    // Monster Sprite.
    const monsterSprite = scene.add.sprite(0, 0, "_MISSING");
    monsterSprite.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 32, 32),
      Phaser.Geom.Rectangle.Contains,
    );
    monsterSprite.scaleX = 3;
    monsterSprite.scaleY = 3;
    monsterSprite.visible = false;
    this.add(monsterSprite);

    // Explosion Sprite.
    const explosionSprite = scene.add.sprite(0, 0, "smoke_fx", 77);
    explosionSprite.scaleX = 2;
    explosionSprite.scaleY = 2;
    explosionSprite.visible = false;
    this.add(explosionSprite);

    // Monster.
    const monster = new BaseMonsterPrefab(this);

    this.monsterSprite = monsterSprite;
    this.explosionSprite = explosionSprite;
    this.monster = monster;

    this.monsterSprite.disableInteractive();
    this.monsterSprite.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.monsterSprite.disableInteractive();
      this.monsterSprite.visible = false;
      this.explosionSprite.visible = true;
      this.explosionSprite.setY(this.monsterSprite.y);
      this.explosionSprite.play("smoke");
      this.scene.events.emit("custom-monster-destroyed", this.monster.points);
    });
  }

  // Class fields.
  monsterSprite;
  explosionSprite;
  monster;
  isMonsterSpawned = false;

  spawnMonster(monster) {
    this.isMonsterSpawned = true;

    this.monster.points = monster.points;
    this.monster.duration = monster.duration;
    this.monster.textureConfig = monster.textureConfig;
    this.monster.animationKey = monster.animationKey;

    this.monsterSprite.setTexture(
      this.monster.textureConfig.key,
      this.monster.textureConfig.frame,
    );
    this.monsterSprite.play(this.monster.animationKey);

    this.showMonster();
  }

  showMonster() {
    this.monsterSprite.visible = true;
    this.monsterSprite.setInteractive();
    this.scene.tweens.add({
      y: this.monsterSprite.y - 100,
      targets: this.monsterSprite,
      duration: 300,
      onComplete: () => {
        this.scene.time.delayedCall(this.monster.duration, () => {
          this.hideMonster();
        });
      },
    });
  }

  hideMonster() {
    this.scene.tweens.add({
      y: this.monsterSprite.y + 100,
      targets: this.monsterSprite,
      duration: 300,
      onComplete: () => {
        this.monsterSprite.visible = false;
        this.isMonsterSpawned = false;
        this.monsterSprite.disableInteractive();
      },
    });
  }
}
