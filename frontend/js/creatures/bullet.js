import { Unit } from "./unit";

const SPEED = 10;
const COLOR = "black";
const SIZE = 6;

export class Bullet extends Unit {
  constructor(ctx, x, y, alfaX, alfaY, width = SIZE, height = SIZE, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x - SIZE / 2, y - SIZE / 2, alfaX, alfaY, speed);
  }

  newPos() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;
    return this;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, SIZE, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  }
}
