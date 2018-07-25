import { moveToAnotherSideIfGoBeyonceCanvas } from "../utils/geometryUtils";

export class Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
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
}
