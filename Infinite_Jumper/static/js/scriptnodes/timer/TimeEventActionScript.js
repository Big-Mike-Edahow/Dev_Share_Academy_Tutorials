// TimeEventActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class TimeEventActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  delay = 1000;
  repeat = 0;
  loop = false;

  // executeChildren()) will fire after a delay, using Phaser's Timer Event system.
  execute(...args) {
    const _scene = this.scene;
    _scene.time.addEvent({
      delay: this.delay,
      loop: this.loop,
      callback: () => {
        this.executeChildren(args);
      },
      repeat: this.repeat,
    });
  }
}
