
export class BuffItem {
  constructor(ctx, width, height, x, y, selector) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.sprite = {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    }
    this.image = document.querySelector(selector);
  }

  draw(ctx) {
    const { image, sprite, x, y, width, height } = this
    ctx.drawImage(image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
    return this;
  }
}
