// PlatformGroupPrefab.js

import PlatformPrefab from "./PlatformPrefab.js";

export default class PlatformGroupPrefab extends Phaser.GameObjects.Layer {
  constructor(scene) {
    super(scene);

    const _scene = scene;
    this.group = _scene.add.group({
      classType: PlatformPrefab,
      runChildUpdate: true,
    });

    this.group.get(120, 0);

    for (let i = 1; i < 5; i += 1) {
      const x = Phaser.Math.Between(10, 200);
      const y = -150 * i;
      this.group.get(x, y);
    }

    this.maxPlatformDistance = scene.scale.height * 3;
    this.bottomMostPlatformYPosition = 0;
  }

  group;
  maxPlatformDistance;
  bottomMostPlatformYPosition;
  enableMovingPlatforms = false;

  update() {
    const scrollY = this.scene.cameras.main.scrollY;
    const children = this.group.getChildren();
    const childrenToMove = [];
    this.bottomMostPlatformYPosition = children[0].y;

    children.forEach((child) => {
      if (child.y >= scrollY + this.maxPlatformDistance) {
        childrenToMove.push(child);
      }
      if (child.y > this.bottomMostPlatformYPosition) {
        this.bottomMostPlatformYPosition = child.y;
      }
    });

    let childrenToMoveYOffset = 0;
    childrenToMove.forEach((child) => {
      child.x = Phaser.Math.Between(10, 200);
      childrenToMoveYOffset += Phaser.Math.Between(10, 40);
      child.y = scrollY - childrenToMoveYOffset;

      if (this.enableMovingPlatforms) {
        if (Phaser.Math.RND.between(0, 1) === 1) {
          child.startPlatformMovement();
        } else {
          child.stopPlatformMovement();
        }
      }
    });
  }
}
