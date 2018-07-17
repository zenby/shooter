import { Unit } from "./unit";

const SPEED = 10;
const COLOR = "black";
export const BULLET = {
  size: 6,
  damage: 20,
  speedDecrease: 0.15
}

export class Bullet extends Unit {
  constructor(ctx, x, y, alfaX, alfaY, width = BULLET.size, height = BULLET.size, speed = SPEED, color = COLOR) {
    super(ctx, width, height, x - BULLET.size / 2, y - BULLET.size / 2, alfaX, alfaY, speed);
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
    ctx.arc(this.x, this.y, BULLET.size, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  }
}

export function growBullet(param = 2) {
  BULLET.size *= param;
}

export function shrinkBullet(param = 2) {
  BULLET.size /= param;
}
