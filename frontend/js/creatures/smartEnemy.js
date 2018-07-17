import { Unit } from "./unit";
import { getCenterCoordinates, isDistanceBetweenUnitsMoreThanSafe } from "../utils";

const SPEED = 0.6;
export const BASE_SMART_SIZE = 16;
const img = document.querySelector('.smart-enemy-sprite')
const MESSAGE = {
  x: 10,
  y: 5,
  font: "13px Arial"
}

export class SmartEnemy extends Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
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
    this.defense = 0;
  }

  setNextSprite() {
    if (this.sprite.x < 48) {
      this.sprite.x += this.sprite.deltaX
    } else {
      this.sprite.x = this.sprite.baseX;
    }
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
      this.dir.y = fearParams.isFear * Math.cos(angle);
      this.dir.x = fearParams.isFear * Math.sin(angle);
      this.showWarningMessage(fearParams.message);
    }
  }

  getFearParams(isFear) {
    if (isFear) {
      return {
        distance: 300,
        isFear: 1,
        message: 'You don\'t catch me!'
      }
    } else {
      return {
        distance: 200,
        isFear: -1,
        message: 'I see you'
      }
    }
  }

  eat(unit) {
    const defenseIncrease = 3;
    const s1 = this.width * this.height;
    const s2 = unit.width * unit.height
    const k = Math.pow((s1 + s2) / s1, 0.5)
    this.width *= k;
    this.height *= k;
    this.defense = Math.max(this.defense, unit.defense) + defenseIncrease;
    this.speed = this.speed > SPEED ? this.speed += 0.1 : SPEED;
    this.x = (this.x * s1 + unit.x * s2) / (s1 + s2);
    this.y = (this.y * s1 + unit.y * s2) / (s1 + s2);
  }
}
