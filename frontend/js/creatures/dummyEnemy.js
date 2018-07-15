import { Creature } from "./creature";

const SPEED = 2;
const COLOR = "red";

export const BASE_DUMMY_SIZE = 18;

export class DummyEnemy extends Creature {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x, y, alfaX, alfaY, speed);
  }
}
