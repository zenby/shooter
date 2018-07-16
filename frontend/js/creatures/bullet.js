import { Unit } from "./unit";

const SPEED = 10;
const COLOR = "black";
let BULLET_SIZE = 6;

export class Bullet extends Unit {
  constructor(ctx, x, y, alfaX, alfaY, width = BULLET_SIZE, height = BULLET_SIZE, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x - BULLET_SIZE / 2, y - BULLET_SIZE / 2, alfaX, alfaY, speed);
  }

  newPos() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;
    return this;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, BULLET_SIZE, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  }
}

export function growBullet(param = 2) {
  BULLET_SIZE *= param;
}

export function shrinkBullet(param = 2) {
  BULLET_SIZE /= param;
}
