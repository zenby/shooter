import { Creature } from "./creature";
import { getCenterCoordinates, isDistanceBetweenCreaturesLowThanSearchable } from "../utils";

const SPEED = 0.5;
const COLOR = "blue";
export const BASE_SMART_SIZE = 16;

const img = document.querySelector('.smart-enemy-sprite')

export class SmartEnemy extends Creature {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x, y, alfaX, alfaY, speed);
    this.sprite = {
      baseX: 0,
      baseY: 0,
      x: 0,
      y: 0,
      width: 16,
      height: 16,
      deltaX: 16,
      deltaY: 16
    }

    setInterval(() => {
      if (this.sprite.x < 48) {
        this.sprite.x += this.sprite.deltaX
      } else {
        this.sprite.x = this.sprite.baseX;
      }
    }, 200)
  }

  newPos(hero) {
    this.updateDirection(hero);
    super.newPos();
    return this;
  }

  update(ctx) {
    const { sprite, x, y, width, height } = this
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }

  showWarningMessage(message) {
    this.ctx.font = "13px Arial";
    this.ctx.strokeText(message || "I see you", this.x + 10, this.y - 5);
  }

  updateDirection(hero) {
    const VISION_DISTANCE = 200;
    if (isDistanceBetweenCreaturesLowThanSearchable(hero, this, VISION_DISTANCE)) {
      const [heroX, heroY] = getCenterCoordinates(hero);
      const angle = Math.atan2(heroX - this.x, heroY - this.y) + Math.PI;
      this.dir.y = -Math.cos(angle);
      this.dir.x = -Math.sin(angle);
      this.showWarningMessage();
    }
  }
}
