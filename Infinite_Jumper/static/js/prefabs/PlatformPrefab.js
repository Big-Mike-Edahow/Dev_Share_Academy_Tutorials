// PlatformPrefab.js

export default class PlatformPrefab extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "platform", frame);

    this.scaleX = 0.75;
    this.scaleY = 0.5;

    scene.physics.add.existing(this, false);

    this.body.allowGravity = false;
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.pushable = false;
    this.body.setSize(80, 16, false);

    this.enablePlatformMovement = false;
    this.horizontalVelocity = 50;
    this.minXPosition = 10;
    this.maxXPosition = 200;
  }

  horizontalVelocity;
  minXPosition;
  maxXPosition;
  enablePlatformMovement;

  update() {
    if (!this.enablePlatformMovement) {
      return;
    }

    const velocity = this.body.velocity;
    if (this.x < this.minXPosition) {
      velocity.x = this.horizontalVelocity;
    } else if (this.x > this.maxXPosition) {
      velocity.x = this.horizontalVelocity * -1;
    }
  }

  startPlatformMovement() {
    this.body.velocity.x = this.horizontalVelocity;
    this.enablePlatformMovement = true;
  }

  stopPlatformMovement() {
    this.body.velocity.x = 0;
    this.enablePlatformMovement = false;
  }
}
