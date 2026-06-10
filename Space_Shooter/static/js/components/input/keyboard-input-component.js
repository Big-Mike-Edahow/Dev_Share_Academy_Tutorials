// keyboard-input-component.js
// Uses the Phaser 3 Keyboard Plugin to detect input in the web browser.

import { InputComponent } from "./input-component.js";

export class KeyboardInputComponent extends InputComponent {
  // Class fields.
  #cursorKeys;
  #inputLocked;

  constructor(scene) {
    super();
    this.#cursorKeys = scene.input.keyboard.createCursorKeys();
    this.#inputLocked = false;
  }

  // Set whether or not the input is locked.
  set lockInput(val) {
    this.#inputLocked = val;
  }

  // Updates the input values based on the Phaser 3 keyboard implementation.
  update() {
    if (this.#inputLocked) {
      this.reset();
      return;
    }

    this._up = this.#cursorKeys.up.isDown;
    this._down = this.#cursorKeys.down.isDown;
    this._left = this.#cursorKeys.left.isDown;
    this._right = this.#cursorKeys.right.isDown;
    this._shoot = this.#cursorKeys.space.isDown;
  }
}
