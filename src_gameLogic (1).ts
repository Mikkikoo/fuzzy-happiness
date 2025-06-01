// Game state and logic for Color Snap

type Color = "red" | "blue" | "green" | "yellow";
type BubbleType = "normal" | "multicolor" | "bomb" | "bonus";

interface Bubble {
  color: Color;
  type: BubbleType;
}

export interface GameState {
  score: number;
  streak: number;
  speed: number;
  bubbles: Bubble[];
  gameOver: boolean;
}

export class ColorSnapGame {
  state: GameState;

  constructor() {
    this.state = {
      score: 0,
      streak: 0,
      speed: 1,
      bubbles: [],
      gameOver: false,
    };
    this.addBubble();
  }

  private randomColor(): Color {
    const colors: Color[] = ["red", "blue", "green", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private randomBubbleType(): BubbleType {
    const r = Math.random();
    if (r > 0.98) return "bomb";
    if (r > 0.95) return "multicolor";
    if (r > 0.90) return "bonus";
    return "normal";
  }

  private addBubble() {
    const bubble: Bubble = {
      color: this.randomColor(),
      type: this.randomBubbleType(),
    };
    this.state.bubbles.push(bubble);
  }

  playTurn(color: Color): GameState {
    if (this.state.gameOver) return this.state;

    const bubble = this.state.bubbles.shift();
    if (!bubble) {
      this.addBubble();
      return this.state;
    }

    switch (bubble.type) {
      case "normal":
        if (color === bubble.color) {
          this.state.score += 1;
          this.state.streak += 1;
          if (this.state.streak % 10 === 0) this.state.speed += 1;
        } else {
          this.state.gameOver = true;
        }
        break;
      case "multicolor":
        this.state.score += 2;
        this.state.streak += 1;
        break;
      case "bomb":
        this.state.gameOver = true;
        break;
      case "bonus":
        if (color === bubble.color) {
          this.state.score += 5;
          this.state.streak += 1;
          this.state.speed = Math.max(1, this.state.speed - 1);
        } else {
          this.state.gameOver = true;
        }
        break;
    }

    this.addBubble();
    return this.state;
  }
}