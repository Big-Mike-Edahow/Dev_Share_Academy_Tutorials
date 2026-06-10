// input-component.js
// Base component for handling player or AI input.

export class InputComponent {
  // Class fields.
  _up;
  _down;
  _left;
  _right;
  _shoot;

  constructor() {
    this.reset();
  }

  // Getter methods to check which keys are being pressed.
  get leftIsDown() {
    return this._left;
  }

  get rightIsDown() {
    return this._right;
  }

  get downIsDown() {
    return this._down;
  }

  get upIsDown() {
    return this._up;
  }

  get shootIsDown() {
    return this._shoot;
  }

  // Resets all of the inputs back to their default values, `false`.
  reset() {
    this._up = false;
    this._down = false;
    this._right = false;
    this._left = false;
    this._shoot = false;
  }
}
