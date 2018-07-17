import { Item } from './item';
import { increaseHeroVelocityByBuff, decreaseHeroVelocityByDebuff } from '../creatures/hero';

export class Shoes extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    const value = 5;
    increaseHeroVelocityByBuff();
    const enemies = [...gameObject.smartEnemies, ...gameObject.dummyEnemies];
    enemies.forEach(enemy => enemy.speed /= value);

    setTimeout(() => {
      console.log('speed fixed back')
      decreaseHeroVelocityByDebuff();
      enemies.forEach(enemy => enemy.speed *= value);
    }, time)
  }
}