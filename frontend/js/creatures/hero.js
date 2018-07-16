import { Unit } from "./unit";

const SPEED = 1;
const HEIGHT = 50;
const WIDTH = 30;
const COLOR = "green";

const img = document.querySelector('.hero-sprite')

export class Hero extends Unit {
  constructor(ctx, width = WIDTH, height = HEIGHT, color = COLOR, x = 50, y = 50, alfaX = 0, alfaY = 0, speed = SPEED) {
    super(ctx, width, height, color, x, y, alfaX, alfaY, speed);
    this.gunDir = {
      x: 1,
      y: 0
    };
    this.isImmortal = false;

    this.sprite = {
      baseX: 9,
      baseY: 2,
      x: 9,
      y: 2,
      width: 16,
      height: 26,
      deltaX: 32,
      deltaY: 32
    }
    setInterval(() => {
      if (this.sprite.y < 96) {
        this.sprite.y += this.sprite.deltaY
      } else {
        this.sprite.y = this.sprite.baseY;
      }
    }, 200)
  }

  update(ctx) {
    const { sprite, x, y, width, height } = this
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }

  updateSpriteDirection(verticalLayer) {
    this.sprite.x = this.sprite.baseX + verticalLayer * this.sprite.deltaX
  }
}
