import { BuffItem } from './buff-item';

export class Shoes extends BuffItem {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject) {
    const value = 2;
    gameObject.hero.speed *= value;
    const enemies = [...gameObject.smartEnemies, ...gameObject.dummyEnemies];
    enemies.forEach(enemy => enemy.speed /= value);

    setTimeout(() => {
      gameObject.hero.speed /= value;
      enemies.forEach(enemy => enemy.speed *= value);
    }, 20000)
  }
}