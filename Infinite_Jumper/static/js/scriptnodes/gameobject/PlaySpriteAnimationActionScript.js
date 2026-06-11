// PlaySpriteAnimationActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class PlaySpriteAnimationActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  animationKey = "";
  ignoreIfPlaying = false;

  execute(...args) {
    const obj = this.getActionTargetObject(args);
    obj.once("animationcomplete-" + this.animationKey, () =>
      this.executeChildren(...args),
    );
    obj.play(this.animationKey, this.ignoreIfPlaying);
  }
}
