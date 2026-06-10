// collider-component.js

import {
  CUSTOM_EVENTS,
  EventBusComponent,
} from "../events/event-bus-component.js";
import { HealthComponent } from "../health/health-component.js";

// Handle collisions between two different game objects in our game.
export class ColliderComponent {
  // Class fields.
  #healthComponent;
  #eventBusComponent;

  constructor(healthComponent, eventBusComponent) {
    this.#healthComponent = healthComponent;
    this.#eventBusComponent = eventBusComponent;
  }

  collideWithEnemyShip() {
    if (this.#healthComponent.isDead) {
      return;
    }
    this.#healthComponent.die();
  }

  collideWithEnemyProjectile() {
    if (this.#healthComponent.isDead) {
      return;
    }
    this.#healthComponent.hit();
    this.#eventBusComponent.emit(CUSTOM_EVENTS.SHIP_HIT);
  }
}
