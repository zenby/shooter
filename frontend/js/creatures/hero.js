import { Unit } from "./unit";
import { HERO_PARAMS, BUFF_PARAMS } from '../constants';

const velocity = {
  speed: 1,
  acceleration: 0.0005,
  maxAccelerationTime: 3000
}

const img = document.querySelector('.hero-sprite');

export class Hero extends Unit {
  constructor(ctx, width = HERO_PARAMS.width, height = HERO_PARAMS.height, x = HERO_PARAMS.posX, y = HERO_PARAMS.posY, alfaX = 0, alfaY = 1, speed = velocity.speed) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
    this.isImmortal = false;
    this.accelerationStartTime = 0;
    this.currentAccelerationTimer = '';
    this.currentBuffs = []

    this.sprite = {
      baseX: 2,
      baseY: 1,
      x: 2,
      y: 1,
      width: 27,
      height: 32,
      deltaX: 32,
      deltaY: 32
    }
  }

  setNextSprite() {
    if (this.sprite.x < 64) {
      this.sprite.x += this.sprite.deltaX;
    } else {
      this.sprite.x = this.sprite.baseX;
    }
  }

  update(ctx) {
    const { sprite, x, y, width, height } = this;
    const speedLabel = document.querySelector('.speed');
    speedLabel.innerHTML = ~~(this.speed * 100) / 100;
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }

  updateSpriteDirection(direction) {
    this.sprite.y = this.sprite.baseY + HERO_PARAMS.spriteLayer[direction] * this.sprite.deltaY
  }

  makeHeroSpeedParamsDefault() {
    if (this.currentAccelerationTimer) {
      clearInterval(this.currentAccelerationTimer)
    }
    this.speed = velocity.speed;
    this.accelerationStartTime = 0;
  }

  setNewSpeedTimer() {
    const startSpeed = this.speed;
    this.accelerationStartTime = 0;
    this.currentAccelerationTimer = setInterval(() => {
      this.accelerationStartTime += 50;
      this.speed = startSpeed + velocity.acceleration * this.accelerationStartTime;
      if (this.accelerationStartTime >= velocity.maxAccelerationTime) {
        clearInterval(this.currentAccelerationTimer);
      }
    }, 50);
  }

  drawBuffs(ctx) {
    const allTime = BUFF_PARAMS.buffTime / 1000;
    this.currentBuffs.forEach((buff, index) => {
      ctx.fillStyle = buff.type;
      ctx.fillRect(this.x, this.y - 10 - index * 10, this.width * (allTime - buff.time) / allTime, 7);
    })
    return this;
  }
}

export function increaseHeroVelocityByBuff(buff = BUFF_PARAMS.speedGrowth) {
  velocity.speed *= buff;
  velocity.acceleration *= buff;
  velocity.maxAccelerationTime *= buff;
}

export function decreaseHeroVelocityByDebuff(deBuff = BUFF_PARAMS.speedGrowth) {
  velocity.speed /= deBuff;
  velocity.acceleration /= deBuff;
  velocity.maxAccelerationTime /= deBuff;
}