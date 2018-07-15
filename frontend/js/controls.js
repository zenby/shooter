export function addHeroControls(hero, createBulletCallback) {
  const { dir, gunDir } = hero;
  document.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 38: {
        dir.y = gunDir.y = -1;
        dir.x = gunDir.x = 0;
        break;
      }
      case 39: {
        dir.y = gunDir.y = 0;
        dir.x = gunDir.x = 1;
        break;
      }
      case 40: {
        dir.y = gunDir.y = 1;
        dir.x = gunDir.x = 0;
        break;
      }
      case 37: {
        dir.x = gunDir.x = -1;
        dir.y = gunDir.y = 0;
        break;
      }
      case 17: {
        dir.x = 0;
        dir.y = 0;
        break;
      }
      case 32: {
        createBulletCallback();
        break;
      }
      default:
        break;
    }
  });
}

export function removeHeroControls() {}

export function moveToAnotherSideIfGoBeyonceCanvas(ctx, item) {
  let FIELD_WIDTH = ctx.canvas.clientWidth;
  let FIELD_HEIGHT = ctx.canvas.clientHeight;

  if (item.x > FIELD_WIDTH) {
    item.x = 0;
  } else if (item.x < 0) {
    item.x = FIELD_WIDTH;
  }
  if (item.y > FIELD_HEIGHT) {
    item.y = 0;
  } else if (item.y < 0) {
    item.y = FIELD_HEIGHT;
  }
}
