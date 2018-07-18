import { Unit } from "./unit";

const velocity = {
  speed: 1,
  acceleration: 0.0005,
  maxAccelerationTime: 3000
}
const HEIGHT = 50;
const WIDTH = 30;
const SPRITE_LAYER = {
  top: 2,
  left: 3,
  right: 0,
  bottom: 1
}

const img = document.querySelector('.hero-sprite');
const speedLabel = document.querySelector('.speed');

export class Hero extends Unit {
  constructor(ctx, width = WIDTH, height = HEIGHT, x = 50, y = 50, alfaX = 0, alfaY = 0, speed = velocity.speed) {
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
    speedLabel.innerHTML = ~~(this.speed * 100) / 100;
    const { sprite, x, y, width, height } = this
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }

  updateSpriteDirection(direction) {
    this.sprite.x = this.sprite.baseX + SPRITE_LAYER[direction] * this.sprite.deltaX
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
    this.currentBuffs.forEach((buff, index) => {
      ctx.fillStyle = buff.type;
      ctx.fillRect(this.x, this.y - 10 - index * 5, this.width * (20 - buff.time) / 20, 5);
    })
    return this;
  }
}

export function increaseHeroVelocityByBuff(buff = 2) {
  velocity.speed *= buff;
  velocity.acceleration *= buff;
  velocity.maxAccelerationTime *= buff;
}

export function decreaseHeroVelocityByDebuff(deBuff = 2) {
  velocity.speed /= deBuff;
  velocity.acceleration /= deBuff;
  velocity.maxAccelerationTime /= deBuff;
}