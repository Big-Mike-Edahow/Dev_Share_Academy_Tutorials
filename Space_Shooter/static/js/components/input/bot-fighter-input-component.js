// bot-fighter-input-component.js

import { InputComponent } from "./input-component.js";

// The `Fighter` enemy will move in a straigh path down the screen,
// and will fire their weapon.
export class BotFighterInputComponent extends InputComponent {
  constructor() {
    super();
    this._down = true;
    this._shoot = true;
  }

  update() {
    //
  }
}
