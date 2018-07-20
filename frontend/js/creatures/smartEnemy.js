import { Unit } from "./unit";
import { getCenterCoordinates, isDistanceBetweenUnitsMoreThanSafe } from "../utils/geometryUtils";
import { smartEnemyParams } from '../constants';

export const BASE_SMART_SIZE = smartEnemyParams.size;
const img = document.querySelector('.mashroom');

export class SmartEnemy extends Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = smartEnemyParams.speed) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
    this.sprite = {
      baseX: 6,
      baseY: 3,
      x: 6,
      y: this.getSpriteLayerValue(this.dir.x, this.dir.y) * 48 + 3,
      width: 34,
      height: 47,
      deltaX: 48,
      deltaY: 48
    }
    this.defense = 0;
  }

  setNextSprite() {
    if (this.sprite.x < 96) {
      this.sprite.x += this.sprite.deltaX;
    } else {
      this.sprite.x = this.sprite.baseX;
    }
  }

  newPos(hero) {
    this.sprite.y = this.getSpriteLayerValue(this.dir.x, this.dir.y) * 48 + this.sprite.baseY;
    this.updateDirection(hero);
    super.newPos();
    return this;
  }

  update(ctx) {
    const { sprite, x, y, width, height } = this;
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height);
    return this;
  }

  getSpriteLayerValue(x, y) {
    const { spriteLayer } = smartEnemyParams;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? spriteLayer.right : spriteLayer.left;
    } else {
      return y > 0 ? spriteLayer.bottom : spriteLayer.top;
    }
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
    const mass1 = this.width * this.height;
    const mass2 = unit.width * unit.height;
    const k = Math.pow((mass1 + mass2) / mass1, 0.5);
    this.width *= k;
    this.height *= k;
    this.defense = Math.max(this.defense, unit.defense) + defenseIncrease;
    let maxSpeed = Math.max(this.speed, unit.speed);
    this.speed = maxSpeed > defaultSpeed ? maxSpeed += speedIncrease : defaultSpeed;
    this.x = (this.x * mass1 + unit.x * mass2) / (mass1 + mass2);
    this.y = (this.y * mass1 + unit.y * mass2) / (mass1 + mass2);
  }
}

function getFearParams(isFear) {
  if (isFear) {
    return {
      distance: smartEnemyParams.fearDistance,
      isFear: 1,
      message: 'You don\'t catch me!'
    }
  } else {
    return {
      distance: smartEnemyParams.visibilityDistance,
      isFear: -1,
      message: 'I see you!'
    }
  }
}