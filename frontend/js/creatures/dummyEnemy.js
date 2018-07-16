import { Unit } from "./unit";

const SPEED = 2;
const COLOR = "red";

export const BASE_DUMMY_SIZE = 18;

export class DummyEnemy extends Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x, y, alfaX, alfaY, speed);
  }
}
