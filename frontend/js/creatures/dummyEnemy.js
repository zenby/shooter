import { Unit } from "./unit";
import { DUMMY_ENEMY_PARAMS } from '../constants';

export const SPEED = DUMMY_ENEMY_PARAMS.speed;
export const BASE_DUMMY_SIZE = DUMMY_ENEMY_PARAMS.size;

export class DummyEnemy extends Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
    this.sprite = {
      baseX: 1,
      baseY: 0,
      x: 0,
      y: this.getSpriteLayerValue(this.dir.x, this.dir.y) * 50,
      width: 34,
      height: 48,
      deltaX: 50,
      deltaY: 50
    }
    this.image = document.querySelector('.ice-demon');
  }

  setNextSprite() {
    if (this.sprite.x < 100) {
      this.sprite.x += this.sprite.deltaX;
    } else {
      this.sprite.x = this.sprite.baseX;
    }
  }

  update(ctx) {
    const { sprite, x, y, width, height, image } = this;
    ctx.drawImage(image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height);
    return this;
  }

  getSpriteLayerValue(x, y) {
    const { spriteLayer } = DUMMY_ENEMY_PARAMS;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? spriteLayer.right : spriteLayer.left;
    } else {
      return y > 0 ? spriteLayer.bottom : spriteLayer.top;
    }
  }
}
