import { Unit } from "./unit";
import { BULLET_PARAMS } from '../constants';

export const currentBullet = {
  size: BULLET_PARAMS.size,
  damage: BULLET_PARAMS.damage,
  speedDecrease: BULLET_PARAMS.speedDecrease
};

export class Bullet extends Unit {
  constructor(ctx, x, y, alfaX, alfaY, width = currentBullet.size, height = currentBullet.size, speed = BULLET_PARAMS.speed, color = BULLET_PARAMS.color) {
    super(ctx, width, height, x - currentBullet.size / 2, y - currentBullet.size / 2, alfaX, alfaY, speed);
    this.color = color;
  }

  newPos() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;
    return this;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = BULLET_PARAMS.colorSecond;
    ctx.arc(this.x + 2, this.y + 2, this.width / 2, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  }
}

export function growBullet(param = BULLET_PARAMS.growAfterBuff) {
  currentBullet.size *= param;
  currentBullet.damage *= param;
  currentBullet.speedDecrease *= param;
}

export function shrinkBullet(param = BULLET_PARAMS.growAfterBuff) {
  currentBullet.size /= param;
  currentBullet.damage /= param;
  currentBullet.speedDecrease /= param;
}

export function makeBulletDefault() {
  currentBullet.size = BULLET_PARAMS.size;
  currentBullet.damage = BULLET_PARAMS.damage;
  currentBullet.speedDecrease = BULLET_PARAMS.speedDecrease;
}