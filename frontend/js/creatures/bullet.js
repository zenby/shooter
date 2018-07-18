import { Unit } from "./unit";
import { initialParams } from '../constants';

const { bulletParams } = initialParams;

export const currentBullet = {
  size: bulletParams.size,
  damage: bulletParams.damage,
  speedDecrease: bulletParams.speedDecrease
};

export class Bullet extends Unit {
  constructor(ctx, x, y, alfaX, alfaY, width = currentBullet.size, height = currentBullet.size, speed = bulletParams.speed, color = bulletParams.color) {
    super(ctx, width, height, x - currentBullet.size / 2, y - currentBullet.size / 2, alfaX, alfaY, speed);
    this.color = color
  }

  newPos() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;
    return this;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, currentBullet.size, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  }
}

export function growBullet(param = bulletParams.growAfterBuff) {
  currentBullet.size *= param;
  currentBullet.damage *= param;
  currentBullet.speedDecrease *= param;
}

export function shrinkBullet(param = bulletParams.growAfterBuff) {
  currentBullet.size /= param;
  currentBullet.damage /= param;
  currentBullet.speedDecrease /= param;
}

export function makeBulletDefault() {
  currentBullet.size = bulletParams.size;
  currentBullet.damage = bulletParams.damage;
  currentBullet.speedDecrease = bulletParams.speedDecrease;
}