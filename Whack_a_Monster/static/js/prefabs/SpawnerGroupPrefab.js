// SpawnerGroupPrefab.js

import SpawnerPrefab from "./SpawnerPrefab.js";

export default class SpawnerGroupPrefab extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x ?? 0, y ?? 0);

    // Spawner 1.
    const spawner1 = new SpawnerPrefab(scene, 275, 0);
    this.add(spawner1);

    // Spawner 2.
    const spawner2 = new SpawnerPrefab(scene, 495, 0);
    this.add(spawner2);

    // Spawner 3.
    const spawner3 = new SpawnerPrefab(scene, 710, 0);
    this.add(spawner3);

    // Spawner 4.
    const spawner4 = new SpawnerPrefab(scene, 915, 0);
    this.add(spawner4);

    // Lists.
    const spawners = [spawner1, spawner4, spawner3, spawner2];
    this.spawners = spawners;

    const graphics = this.scene.add.graphics();
    graphics
      .fillStyle(0xffffff)
      .fillRect(0, 0, this.scene.scale.width, this.y - 40)
      .setVisible(false);
    const mask = graphics.createGeometryMask(graphics);
    this.setMask(mask);
  }

  // Class fields.
  spawners;
}
