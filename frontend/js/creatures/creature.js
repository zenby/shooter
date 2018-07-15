import { moveToAnotherSideIfGoBeyonceCanvas } from "../controls";

export class Creature {
  constructor(ctx, width, height, color, x, y, alfaX, alfaY, speed) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.dir = {
      x: alfaX,
      y: alfaY
    };
  }

  newPos() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;
    moveToAnotherSideIfGoBeyonceCanvas(this.ctx, this);
    return this;
  }

  update(ctx) {
    // ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI, true);
    return this;
  }
}
