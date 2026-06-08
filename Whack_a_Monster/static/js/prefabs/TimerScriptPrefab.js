// TimerScriptPrefab.js

import ScriptNode from "/static/js/scripts/ScriptNode.js";

export default class TimerScriptPrefab extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  // Class fields.
  seconds = 30;
  timer;
  isFinished = false;

  execute() {
    this.timer = this.scene.time.addEvent({
      delay: this.seconds * 1000,
      paused: false,
    });
  }

  update() {
    if (this.timer === undefined) {
      return;
    }
    if (this.isFinished) {
      return;
    }

    this.gameObject.setText(this.timer.getRemainingSeconds().toFixed(0));
    if (this.timer.getProgress() === 1) {
      this.isFinished = true;
      this.scene.events.emit("custom-timer-finished");
    }
  }
}
