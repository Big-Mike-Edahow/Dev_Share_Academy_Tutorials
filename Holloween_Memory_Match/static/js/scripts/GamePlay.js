// GamePlay.js

import ScriptNode from "/static/js/scripts_base/ScriptNode.js";
import { MemoryMatch } from "./lib/memory-match.js";

export default class GamePlay extends ScriptNode {
  constructor(parent) {
    super(parent);
  }

  /** @type {CardPrefab[]} */
  cards = [];
  /** @type {Phaser.GameObjects.GameObject} */
  cardContainer;
  /** @type {ScriptNode[]} */
  gameOverScriptNodes = [];

  memoryMatch;
  lockInput = true;

  awake() {
    this.lockInput = true;
    this.memoryMatch = new MemoryMatch({
      cards: this.cards,
      onCardFlipCallback: (cardIndex) => {
        this.onCardFlipCallback(cardIndex);
      },
      onMatchCallback: (firstIndex, secondIndex) => {
        this.onMatchCallback(firstIndex, secondIndex);
      },
      onMismatchCallback: (firstIndex, secondIndex) => {
        this.onMismatchCallback(firstIndex, secondIndex);
      },
      onGameOverCallback: () => {
        this.onGameOverCallback();
      },
      howToCheckForMatch: (firstCard, secondCard) => {
        return this.checkForMatch(firstCard, secondCard);
      },
      // howToShuffle: (cards) => {},
    });
    this.scene.events.on("card-clicked", (card) => {
      if (this.lockInput) {
        return;
      }
      this.memoryMatch.flipCard(card.name);
    });
    this.dealCards();
  }

  dealCards() {
    this.cardContainer.setY(700);
    this.scene.tweens.add({
      targets: this.cardContainer,
      y: 360,
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      onComplete: () => {
        this.cards.forEach((card, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const x = 140 + col * 240 - 500;
          const y = 45 + row * 180 - 300;
          card.name = index;
          this.moveCard(card, x, y, index);
        });
      },
    });
    this.scene.time.delayedCall(3000, () => {
      this.lockInput = false;
    });
  }

  moveCard(card, x, y, index) {
    this.scene.tweens.add({
      targets: card,
      x,
      y,
      duration: 200,
      delay: 200 * index,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  checkForMatch(firstCard, secondCard) {
    return (
      firstCard.cardFrontTextureConfig.frame ===
      secondCard.cardFrontTextureConfig.frame
    );
  }

  onCardFlipCallback(cardIndex) {
    this.cards[cardIndex].flip();
  }

  onMatchCallback(firstIndex, secondIndex) {
  }

  onMismatchCallback(firstIndex, secondIndex) {
    this.lockInput = true;
    this.scene.time.delayedCall(1000, () => {
      this.cards[firstIndex].flip();
      this.cards[secondIndex].flip();
      this.lockInput = false;
    });
  }

  onGameOverCallback() {
    this.gameOverScriptNodes.forEach((scriptNode) => {
      scriptNode.execute();
    });
  }
}
