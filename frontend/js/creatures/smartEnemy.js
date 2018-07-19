import { Unit } from "./unit";
import { getCenterCoordinates, isDistanceBetweenUnitsMoreThanSafe } from "../utils/geometry";
import { smartEnemyParams } from '../constants';

export const BASE_SMART_SIZE = smartEnemyParams.size;
const img = document.querySelector('.smart-enemy-sprite')

export class SmartEnemy extends Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = smartEnemyParams.speed) {
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
    const { message } = smartEnemyParams;
    this.ctx.font = message.font;
    this.ctx.strokeText(text, this.x + message.x, this.y - message.y);
  }

  updateDirection(hero) {
    const fearParams = getFearParams(hero.isImmortal);
    if (!isDistanceBetweenUnitsMoreThanSafe(hero, this, fearParams.distance)) {
      const [heroX, heroY] = getCenterCoordinates(hero);
      const angle = Math.atan2(heroX - this.x - this.width / 2, heroY - this.y - this.height / 2) + Math.PI;
      this.dir.y = fearParams.isFear * Math.cos(angle);
      this.dir.x = fearParams.isFear * Math.sin(angle);
      this.showWarningMessage(fearParams.message);
    }
  }

  eat(unit) {
    const { defenseIncrease, speedIncrease } = smartEnemyParams;
    const defaultSpeed = smartEnemyParams.speed;
    const s1 = this.width * this.height;
    const s2 = unit.width * unit.height
    const k = Math.pow((s1 + s2) / s1, 0.5)
    this.width *= k;
    this.height *= k;
    this.defense = Math.max(this.defense, unit.defense) + defenseIncrease;
    this.speed = this.speed > defaultSpeed ? this.speed += speedIncrease : defaultSpeed;
    this.x = (this.x * s1 + unit.x * s2) / (s1 + s2);
    this.y = (this.y * s1 + unit.y * s2) / (s1 + s2);
  }
}

function getFearParams(isFear) {
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
      message: 'I see you!'
    }
  }
}