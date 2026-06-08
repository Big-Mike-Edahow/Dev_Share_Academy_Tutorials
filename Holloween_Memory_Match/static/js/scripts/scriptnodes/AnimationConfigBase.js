// AnimationConfigBase.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";

export default class AnimationConfigBase extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  /** @type {number} */
  to = 0;
  /** @type {number} */
  from = 0;
  /** @type {number} */
  duration = 1000;
  /** @type {number} */
  repeat = 0;
  /** @type {string} */
  property = "";
  /** @type {boolean} */
  autoExecute = false;
  /** @type {boolean} */
  yoyo = false;
  /** @type {string} */
  ease = "sine.inout";
  /** @type {number} */
  delay = 0;
  /** @type {Phaser.GameObjects.GameObject} */
  target;

  awake() {
    if (this.autoExecute) {
      this.execute();
    }
  }

  execute() {
    /** @type {Phaser.Types.Tweens.TweenBuilderConfig} */
    const tweenConfig = {
      targets: this.gameObject,
      duration: this.duration,
      yoyo: this.yoyo,
      repeat: this.repeat,
      ease: this.ease,
      [this.property]: {
        to: this.to,
        from: this.from,
      },
      onComplete: () => {
        this.executeChildren();
      },
      delay: this.delay,
    };
    if (this.target !== undefined) {
      tweenConfig.targets = this.target;
    }
    /** @type {Phaser.Scene} */ (this.scene).tweens.add(tweenConfig);
  }
}
