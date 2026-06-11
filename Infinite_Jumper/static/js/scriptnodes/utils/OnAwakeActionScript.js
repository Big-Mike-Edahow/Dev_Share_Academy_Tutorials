// OnAwakeActionScript.js

import ScriptNode from "../base/ScriptNode.js";

export default class OnAwakeActionScript extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  awake() {
    this.executeChildren();
  }
}
