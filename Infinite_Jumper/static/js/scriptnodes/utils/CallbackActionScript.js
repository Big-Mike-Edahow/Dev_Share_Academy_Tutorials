// CallbackActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class CallbackActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  callback;

  /* When the execute method is called by a game event (such as a click or a timer),
     the callback is activated and any arguments are automatically passed through. */
  execute(...args) {
    if (this.callback) {
      this.callback(...args);
    }
  }
}
