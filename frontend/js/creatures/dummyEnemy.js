import { Unit } from "./unit";

const SPEED = 0.5;

export const BASE_DUMMY_SIZE = 25;
const img = document.querySelector('.dummy-enemy-sprite');
const SPRITE_LAYER = {
  top: 3,
  left: 1,
  right: 0,
  bottom: 2
}

export class DummyEnemy extends Unit {
  constructor(ctx, width, height, x, y, alfaX, alfaY, speed = SPEED) {
    super(ctx, width, height, x, y, alfaX, alfaY, speed);
    this.sprite = {
      baseX: 0,
      baseY: 0,
      x: 0,
      y: this.getSpriteLayerValue(this.dir.x, this.dir.y) * 16,
      width: 16,
      height: 16,
      deltaX: 16,
      deltaY: 16
    }
  }

  setNextSprite() {
    if (this.sprite.x < 16) {
      this.sprite.x += this.sprite.deltaX;
    } else {
      this.sprite.x = this.sprite.baseX;
    }
  }

  update(ctx) {
    const { sprite, x, y, width, height } = this
    ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }

  getSpriteLayerValue(x, y) {
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? SPRITE_LAYER.right : SPRITE_LAYER.left;
    } else {
      return y > 0 ? SPRITE_LAYER.bottom : SPRITE_LAYER.top;
    }
  }

}

