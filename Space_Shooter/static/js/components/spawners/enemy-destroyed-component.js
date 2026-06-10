// enemy-destroyed-component.js
// Group for spawning game objects when an enemy game object is destroyed.

import {
  CUSTOM_EVENTS,
  EventBusComponent,
} from "../events/event-bus-component.js";

export class EnemyDestroyedComponent {
  // Class fields.
  #scene;
  #group;
  #eventBusComponent;

  constructor(scene, eventBusComponent) {
    this.#scene = scene;
    this.#eventBusComponent = eventBusComponent;

    // Create group.
    this.#group = this.#scene.add.group({
      name: `${this.constructor.name}-${Phaser.Math.RND.uuid()}`,
    });

    // Get the enemies coords. Play the ship destroyed animation.
    this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, (enemy) => {
      const gameObject = this.#group.get(
        enemy.x,
        enemy.y,
        enemy.shipAssetKey,
        0,
      );
      gameObject.play({
        key: enemy.shipDestroyedAnimationKey,
      });
    });
  }
}
