// TweenActionScript.js;

import ScriptNode from "../base/ScriptNode.js";

export default class TweenActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }
  // Class fields.
  target;
  duration = 0;
  yoyo = false;
  repeat = 0;
  delay = 0;
  loopDelay = 0;
  tween;
  tweenProperty = "";
  tweenPropertyValue;

  execute(...args) {
    const _scene = this.scene;

    this.tween = _scene.tweens.add({
      targets: this.target,
      duration: this.duration,
      yoyo: this.yoyo,
      repeat: this.repeat,
      delay: this.delay,
      loopDelay: this.loopDelay,
      [this.tweenProperty]: this.tweenPropertyValue,
      onComplete: () => {
        this.executeChildren(args);
      },
    });
  }
}
