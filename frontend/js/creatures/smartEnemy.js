import { Unit } from "./unit";
import { getCenterCoordinates, isDistanceBetweenUnitsMoreThanSafe } from "../utils/geometryUtils";
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
    const fearParams = getFearParams(this, hero.isImmortal);
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
    const mass1 = this.width * this.height;
    const mass2 = unit.width * unit.height
    const k = Math.pow((mass1 + mass2) / mass1, 0.5)
    this.width = Math.max(this.width * k, smartEnemyParams.maxSize);
    this.height = Math.max(this.height * k, smartEnemyParams.maxSize);
    this.defense = Math.max(this.defense, unit.defense) + defenseIncrease;
    let maxSpeed = Math.max(this.speed, unit.speed);
    this.speed = maxSpeed > defaultSpeed ? maxSpeed += speedIncrease : defaultSpeed;
    this.x = (this.x * mass1 + unit.x * mass2) / (mass1 + mass2);
    this.y = (this.y * mass1 + unit.y * mass2) / (mass1 + mass2);
  }

  isMaxSize() {
    const { maxSize } = smartEnemyParams
    return this.width === maxSize && this.height === maxSize
  }
}

function getFearParams(unit, isFear) {
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
      message: !unit.isMaxSize() ? 'Don\'t fear, I\'m on the diet!' : 'I see you!'
    }
  }
}