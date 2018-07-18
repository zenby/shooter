import { Unit } from "./unit";

const SPEED = 10;
const COLOR = "black";
const DEFAULT_BULLET = {
  size: 5,
  damage: 20,
  speedDecrease: 0.10
}

export const currentBullet = {
  size: DEFAULT_BULLET.size,
  damage: DEFAULT_BULLET.damage,
  speedDecrease: DEFAULT_BULLET.speedDecrease
};

export class Bullet extends Unit {
  constructor(ctx, x, y, alfaX, alfaY, width = currentBullet.size, height = currentBullet.size, speed = SPEED, color = COLOR) {
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

export function growBullet(param = 2) {
  currentBullet.size *= param;
  currentBullet.damage *= param;
  currentBullet.speedDecrease *= param;
}

export function shrinkBullet(param = 2) {
  currentBullet.size /= param;
  currentBullet.damage /= param;
  currentBullet.speedDecrease /= param;
}

export function makeBulletDefault() {
  currentBullet.size = DEFAULT_BULLET.size;
  currentBullet.damage = DEFAULT_BULLET.damage;
  currentBullet.speedDecrease = DEFAULT_BULLET.speedDecrease;
}