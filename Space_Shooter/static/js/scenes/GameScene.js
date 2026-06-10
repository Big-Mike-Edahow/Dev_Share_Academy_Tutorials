// GameScene.js

import { EnemySpawnerComponent } from "../components/spawners/enemy-spawner-component.js";
import { FighterEnemy } from "../objects/enemies/fighter-enemy.js";
import { ScoutEnemy } from "../objects/enemies/scout-enemy.js";
import { Player } from "../objects/player.js";
import * as CONFIG from "../config.js";
import {
  CUSTOM_EVENTS,
  EventBusComponent,
} from "../components/events/event-bus-component.js";
import { EnemyDestroyedComponent } from "../components/spawners/enemy-destroyed-component.js";
import { Score } from "../objects/ui/score.js";
import { Lives } from "../objects/ui/lives.js";
import { AudioManager } from "../objects/audio-manager.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  create() {
    // Backgrounds.
    this.add
      .sprite(0, 0, "bg1", 0)
      .setOrigin(0, 1)
      .setAlpha(0.7)
      .play("bg1")
      .setAngle(90)
      .setScale(1, 1.25);
    this.add
      .sprite(0, 0, "bg2", 0)
      .setOrigin(0, 1)
      .setAlpha(0.7)
      .play("bg2")
      .setAngle(90)
      .setScale(1, 1.25);
    this.add
      .sprite(0, 0, "bg3", 0)
      .setOrigin(0, 1)
      .setAlpha(0.7)
      .play("bg3")
      .setAngle(90)
      .setScale(1, 1.25);

    // Common components.
    const eventBusComponent = new EventBusComponent();

    // Spawn player.
    const player = new Player(this, eventBusComponent);

    // Spawn enemies.
    const scoutSpawner = new EnemySpawnerComponent(
      this,
      ScoutEnemy,
      {
        interval: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
        spawnAt: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START,
      },
      eventBusComponent,
    );
    const fighterSpawner = new EnemySpawnerComponent(
      this,
      FighterEnemy,
      {
        interval: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
        spawnAt: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START,
      },
      eventBusComponent,
    );
    new EnemyDestroyedComponent(this, eventBusComponent);

    // Collisions between player and enemy groups.
    this.physics.add.overlap(
      player,
      scoutSpawner.phaserGroup,
      (playerGameObject, enemyGameObject) => {
        if (!enemyGameObject.active || !playerGameObject.active) {
          return;
        }
        playerGameObject.colliderComponent.collideWithEnemyShip();
        enemyGameObject.colliderComponent.collideWithEnemyShip();
      },
    );
    this.physics.add.overlap(
      player,
      fighterSpawner.phaserGroup,
      (playerGameObject, enemyGameObject) => {
        if (!enemyGameObject.active || !playerGameObject.active) {
          return;
        }
        playerGameObject.colliderComponent.collideWithEnemyShip();
        enemyGameObject.colliderComponent.collideWithEnemyShip();
      },
    );
    eventBusComponent.on(CUSTOM_EVENTS.ENEMY_INIT, (gameObject) => {
      // If name is an enemy from pool, add collision check for weapon group if needed.
      if (gameObject.constructor.name !== "FighterEnemy") {
        return;
      }

      this.physics.add.overlap(
        player,
        gameObject.weaponGameObjectGroup,
        (playerGameObject, projectileGameObject) => {
          if (!playerGameObject.active) {
            return;
          }

          gameObject.weaponComponent.destroyBullet(projectileGameObject);
          playerGameObject.colliderComponent.collideWithEnemyProjectile();
        },
      );
    });

    // Collisions between player weapons and enemy groups.
    this.physics.add.overlap(
      player.weaponGameObjectGroup,
      scoutSpawner.phaserGroup,
      (enemyGameObject, projectileGameObject) => {
        if (!enemyGameObject.active) {
          return;
        }
        player.weaponComponent.destroyBullet(projectileGameObject);
        enemyGameObject.colliderComponent.collideWithEnemyProjectile();
      },
    );
    this.physics.add.overlap(
      player.weaponGameObjectGroup,
      fighterSpawner.phaserGroup,
      (enemyGameObject, projectileGameObject) => {
        if (!enemyGameObject.active) {
          return;
        }
        player.weaponComponent.destroyBullet(projectileGameObject);
        enemyGameObject.colliderComponent.collideWithEnemyProjectile();
      },
    );

    // UI.
    new Score(this, eventBusComponent);
    new Lives(this, eventBusComponent);

    // Audio.
    new AudioManager(this, eventBusComponent);
  }
}
