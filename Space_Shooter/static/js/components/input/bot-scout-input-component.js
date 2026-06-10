// bot-scout-input-component.js

import { InputComponent } from "./input-component.js";
import * as CONFIG from "../../config.js";

// The enemy will move in a wave pattern left and right across the screen.
// The 'Scout' enemy does not fire their weapon.

export class BotScoutInputComponent extends InputComponent {
  // Class fields.
  #gameObject;
  #startX;
  #maxXMovement;

  constructor(gameObject) {
    super();
    this.#gameObject = gameObject;
    this.#startX = this.#gameObject.x;
    this.#maxXMovement = CONFIG.ENEMY_SCOUT_MOVEMENT_MAX_X;
    this._right = true;
    this._left = false;
    this._down = true;
  }

  // Reset the default starting X position of the game object.
  set startX(val) {
    this.#startX = val;
  }

  // Pattern of moving left and right across the screen automatically.
  update() {
    if (this.#gameObject.x > this.#startX + this.#maxXMovement) {
      this._left = true;
      this._right = false;
    } else if (this.#gameObject.x < this.#startX - this.#maxXMovement) {
      this._left = false;
      this._right = true;
    }
  }
}
