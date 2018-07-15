import { Creature } from "./creature";

const SPEED = 3;
const HEIGHT = 20;
const WIDTH = 20;
const COLOR = "green";

export class Hero extends Creature {
  constructor(ctx, width = WIDTH, height = HEIGHT, color = COLOR, x = 50, y = 50, alfaX = 0, alfaY = 0, speed = SPEED) {
    super(ctx, width, height, color, x, y, alfaX, alfaY, speed);
    this.gunDir = {
      x: 1,
      y: 0
    };
  }
}
