import { Unit } from "./unit";
import { getCenterCoordinates, isDistanceBetweenUnitsMoreThanSafe } from "../utils";

const SPEED = 0.6;
const COLOR = "blue";
export const BASE_SMART_SIZE = 16;
const img = document.querySelector('.smart-enemy-sprite')
const MESSAGE = {
  x: 10,
  y: 5,
  font: "13px Arial"
}

export class SmartEnemy extends Unit {
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

  showWarningMessage(text) {
    this.ctx.font = MESSAGE.font;
    this.ctx.strokeText(text, this.x + MESSAGE.x, this.y - MESSAGE.y);
  }

  updateDirection(hero) {
    const fearParams = this.getFearParams(hero.isImmortal);
    if (!isDistanceBetweenUnitsMoreThanSafe(hero, this, fearParams.distance)) {
      const [heroX, heroY] = getCenterCoordinates(hero);
      const angle = Math.atan2(heroX - this.x - this.width / 2, heroY - this.y - this.height / 2) + Math.PI;
      this.dir.y = fearParams.coefficient * Math.cos(angle);
      this.dir.x = fearParams.coefficient * Math.sin(angle);
      this.showWarningMessage(fearParams.message);
    }
  }

  getFearParams(isFear) {
    if (isFear) {
      return {
        distance: 300,
        coefficient: 1,
        message: 'You don\'t catch me!'
      }
    } else {
      return {
        distance: 200,
        coefficient: -1,
        message: 'I see you'
      }
    }
  }
}
