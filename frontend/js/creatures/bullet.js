import { Creature } from "./creature";

const SPEED = 30;
const COLOR = "orange";
const SIZE = 6;

export class Bullet extends Creature {
  constructor(ctx, x, y, alfaX, alfaY, width = SIZE, height = SIZE, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x - SIZE / 2, y - SIZE / 2, alfaX, alfaY, speed);
  }

  newPos() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;
    return this;
  }
}
