import { hideReplayButton, initializeGame, updateLevel } from './main';

export function addSnapshotToReplay(units, time, hero, dummyEnemies, smartEnemies, heroBullets, buffItem, lvl) {
  units.push(getReplaySnapshotObject(time, hero, dummyEnemies, smartEnemies, heroBullets, buffItem, lvl))
}

function getReplaySnapshotObject(time, hero, dummyEnemies, smartEnemies, heroBullets, buffItem, lvl) {
  return {
    time: time,
    hero: { unit: hero, posX: ~~hero.x, posY: ~~hero.y, spriteX: hero.sprite.x, spriteY: hero.sprite.y },
    dummyEnemies: getReplayItemsArray(dummyEnemies),
    smartEnemies: getReplayItemsArray(smartEnemies),
    heroBullets: getReplayItemsArray(heroBullets),
    buffItem: buffItem,
    lvl: lvl
  }
}

function getReplayItemsArray(array) {
  return array.map(item =>
    ({ unit: item, posX: ~~item.x, posY: ~~item.y, width: ~~item.width, height: ~~item.height }))
}

function updateUnitPosition(replayItem) {
  replayItem.unit.x = replayItem.posX;
  replayItem.unit.y = replayItem.posY;
}

function updateReplayItemsArray(ctx, array, hero) {
  array.forEach(replayItem => {
    updateUnitPosition(replayItem);
    replayItem.unit.width = replayItem.width;
    replayItem.unit.height = replayItem.height;
    replayItem.unit.newPos(hero).update(ctx)
  });
}

export function showReplay(replay, ctx) {
  let frame = 0;
  const renderTimer = setInterval(() => {
    const { hero, dummyEnemies, smartEnemies, lvl } = replay.units[frame];
    const units = [hero, ...dummyEnemies, ...smartEnemies];
    units.forEach(replayItem => replayItem.unit.setNextSprite());
    updateLevel(lvl);
  }, 200)
  const timer = setInterval(() => {
    const { hero, dummyEnemies, smartEnemies, heroBullets, buffItem } = replay.units[frame];
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    // replay.landscape.draw(ctx);
    updateUnitPosition(hero);
    hero.unit.sprite.x = hero.spriteX;
    hero.unit.sprite.y = hero.spriteY;
    hero.unit.newPos().update(ctx);
    updateReplayItemsArray(ctx, dummyEnemies);
    updateReplayItemsArray(ctx, smartEnemies, hero.unit);
    updateReplayItemsArray(ctx, heroBullets);
    buffItem && buffItem.draw(ctx)
    frame++;
    if (frame === replay.units.length - 1) {
      clearInterval(renderTimer);
      clearInterval(timer);
      hideReplayButton();
      initializeGame();
    }
  }, 20);
}