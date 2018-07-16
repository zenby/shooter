export function addHeroControls(hero, createBullet) {
  const { dir, gunDir } = hero;
  document.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 38: {
        hero.updateSpriteDirection(2);
        dir.y = gunDir.y = -1;
        dir.x = gunDir.x = 0;
        break;
      }
      case 39: {
        hero.updateSpriteDirection(0);
        dir.y = gunDir.y = 0;
        dir.x = gunDir.x = 1;
        break;
      }
      case 40: {
        hero.updateSpriteDirection(1);
        dir.y = gunDir.y = 1;
        dir.x = gunDir.x = 0;
        break;
      }
      case 37: {
        hero.updateSpriteDirection(3);
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
        createBullet();
        break;
      }
      default:
        break;
    }
  });
}

export function removeHeroControls() { }

export function moveToAnotherSideIfGoBeyonceCanvas(ctx, unit) {
  let FIELD_WIDTH = ctx.canvas.clientWidth;
  let FIELD_HEIGHT = ctx.canvas.clientHeight;

  if (unit.x > FIELD_WIDTH) {
    unit.x = 0;
  } else if (unit.x < 0) {
    unit.x = FIELD_WIDTH;
  }
  if (unit.y > FIELD_HEIGHT) {
    unit.y = 0;
  } else if (unit.y < 0) {
    unit.y = FIELD_HEIGHT;
  }
}
