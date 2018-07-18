import { Item } from './item';
import { increaseHeroVelocityByBuff, decreaseHeroVelocityByDebuff } from '../../creatures/hero';
import { addBuffIndicator } from '../../utils/effects'
import { buffTypes } from './buff-generator';

export class Shoes extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    const value = 5;
    addBuffIndicator(gameObject.hero, buffTypes[2].color);
    increaseHeroVelocityByBuff();
    const enemies = [...gameObject.smartEnemies, ...gameObject.dummyEnemies];
    enemies.forEach(enemy => enemy.speed /= value);

    const timer = setTimeout(() => {
      decreaseHeroVelocityByDebuff();
      enemies.forEach(enemy => enemy.speed *= value);
    }, time)
    gameObject.timers.push(timer);
  }
}