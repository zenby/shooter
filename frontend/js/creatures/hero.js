import { Unit } from "./unit";
import { heroParams, buffParams } from '../constants';

const velocity = {
  speed: 1,
  acceleration: 0.0005,
  maxAccelerationTime: 3000
}

const img = document.querySelector('.hero-sprite');

export class Hero extends Unit {
  constructor(ctx, width = heroParams.width, height = heroParams.height, x = heroParams.posX, y = heroParams.posY, alfaX = 1, alfaY = 0, speed = velocity.speed) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
    this.isImmortal = false;
    this.accelerationStartTime = 0;
    this.currentAccelerationTimer = '';
    this.currentBuffs = []

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
  }

  setNextSprite() {
    if (this.sprite.y < 96) {
      this.sprite.y += this.sprite.deltaY
    } else {
      this.sprite.y = this.sprite.baseY;
    }
  }

  update(ctx) {
    const speedLabel = document.querySelector('.speed');
    speedLabel.innerHTML = ~~(this.speed * 100) / 100;
    const { sprite, x, y, width, height } = this
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }

  updateSpriteDirection(direction) {
    this.sprite.x = this.sprite.baseX + heroParams.spriteLayer[direction] * this.sprite.deltaX
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
        clearInterval(this.currentAccelerationTimer)
      }
    }, 50);
  }

  drawBuffs(ctx) {
    const allTime = buffParams.buffTime / 1000;
    this.currentBuffs.forEach((buff, index) => {
      ctx.fillStyle = buff.type;
      ctx.fillRect(this.x, this.y - 10 - index * 10, this.width * (allTime - buff.time) / allTime, 7);
    })
    return this;
  }
}

export function increaseHeroVelocityByBuff(buff = buffParams.speedGrowth) {
  velocity.speed *= buff;
  velocity.acceleration *= buff;
  velocity.maxAccelerationTime *= buff;
}

export function decreaseHeroVelocityByDebuff(deBuff = buffParams.speedGrowth) {
  velocity.speed /= deBuff;
  velocity.acceleration /= deBuff;
  velocity.maxAccelerationTime /= deBuff;
}