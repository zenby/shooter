import { BuffItem } from './buff-item';
import { increaseHeroVelocityByBuff, decreaseHeroVelocityByDebuff } from '../creatures/hero';

export class Shoes extends BuffItem {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    const value = 5;
    increaseHeroVelocityByBuff();
    const enemies = [...gameObject.smartEnemies, ...gameObject.dummyEnemies];
    enemies.forEach(enemy => enemy.speed /= value);

    setTimeout(() => {
      decreaseHeroVelocityByDebuff();
      enemies.forEach(enemy => enemy.speed *= value);
    }, time)
  }
}