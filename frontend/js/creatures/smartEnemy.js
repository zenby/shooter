import { Creature } from "./creature";
import { getCenterCoordinates, isDistanceBetweenCreaturesLowThanSearchable } from "../utils";

const SPEED = 0.1;
const COLOR = "blue";
export const BASE_SMART_SIZE = 16;

export class SmartEnemy extends Creature {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED, color = COLOR) {
    super(ctx, width, height, color, x, y, alfaX, alfaY, speed);
  }

  newPos(hero) {
    this.updateDirection(hero);
    super.newPos();
    return this;
  }

  showWarningMessage(message) {
    this.ctx.font = "13px Arial";
    this.ctx.strokeText(message || "I see you", this.x + 10, this.y - 5);
  }

  updateDirection(hero) {
    const VISION_DISTANCE = 200;
    if (isDistanceBetweenCreaturesLowThanSearchable(hero, this, VISION_DISTANCE)) {
      const [heroX, heroY] = getCenterCoordinates(hero);
      const angle = Math.atan2(heroX - this.x, heroY - this.y) + Math.PI;
      this.dir.y = -Math.cos(angle);
      this.dir.x = -Math.sin(angle);
      this.showWarningMessage();
    }
  }
}
