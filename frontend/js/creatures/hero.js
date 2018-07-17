import { Unit } from "./unit";

const SPEED = 1;
const HEIGHT = 50;
const WIDTH = 30;
const ACCELERATION = 0.0005;
const MAX_ACCELERATION_TIME = 3000;
const SPRITE_LAYER = {
  top: 2,
  left: 3,
  right: 0,
  bottom: 1
}

const img = document.querySelector('.hero-sprite');
const speedLabel = document.querySelector('.speed');

export class Hero extends Unit {
  constructor(ctx, width = WIDTH, height = HEIGHT, x = 50, y = 50, alfaX = 0, alfaY = 0, speed = SPEED) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
    this.isImmortal = false;
    this.accelerationStartTime = 0;
    this.currentAccelerationTimer = '';

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
    this.speed = SPEED;
    this.accelerationStartTime = 0;
  }

  setNewSpeedTimer() {
    const startSpeed = this.speed;
    this.accelerationStartTime = 0;
    this.currentAccelerationTimer = setInterval(() => {
      this.accelerationStartTime += 50;
      this.speed = startSpeed + ACCELERATION * this.accelerationStartTime;
      if (this.accelerationStartTime >= MAX_ACCELERATION_TIME) {
        clearInterval(this.currentAccelerationTimer)
      }
    }, 50);
  }
}
