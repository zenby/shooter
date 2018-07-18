
export class Landscape {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.canvasWidth = ctx.canvas.clientWidth;
    this.canvasHeight = ctx.canvas.clientWidth;
    this.sprite = {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    }
    this.image = document.querySelector('.landscape');
  }

  draw(ctx) {
    const { image, sprite, canvasWidth, canvasHeight, width, height } = this
    for (let x = 0; x < canvasWidth; x += width) {
      for (let y = 0; y < canvasHeight; y += height) {
        ctx.drawImage(image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height)
      }
    }
    return this;
  }
}
