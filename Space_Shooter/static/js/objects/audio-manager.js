// audio-manager.js
// Manages the game audio.

import {
  CUSTOM_EVENTS,
  EventBusComponent,
} from "../components/events/event-bus-component.js";

export class AudioManager {
  // Class fields.
  #scene;
  #eventBusComponent;

  constructor(scene, eventBusComponent) {
    this.#scene = scene;
    this.#eventBusComponent = eventBusComponent;

    // Start background music.
    this.#scene.sound.play("bg", {
      volume: 0.6,
      loop: true,
    });

    // Listen for ship destroyed events.
    this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, () => {
      this.#scene.sound.play("explosion", {
        volume: 0.6,
      });
    });
    this.#eventBusComponent.on(CUSTOM_EVENTS.PLAYER_DESTROYED, () => {
      this.#scene.sound.play("explosion", {
        volume: 0.6,
      });
    });

    // Listen for ship hit events.
    this.#eventBusComponent.on(CUSTOM_EVENTS.SHIP_HIT, () => {
      this.#scene.sound.play("hit", {
        volume: 0.6,
      });
    });

    // Listen for ship fire bullet events.
    this.#eventBusComponent.on(CUSTOM_EVENTS.SHIP_SHOOT, () => {
      this.#scene.sound.play("shot1", {
        volume: 0.05,
      });
    });
  }
}
