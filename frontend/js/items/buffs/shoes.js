import { Item } from './item';
import { increaseHeroVelocityByBuff, decreaseHeroVelocityByDebuff } from '../../creatures/hero';
import { addBuffIndicator } from '../../utils/effectsUtils'
import { buffTypes } from './buffGenerator';
import { buffParams } from '../../constants';

export class Shoes extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject) {
    const value = 5;
    addBuffIndicator(gameObject.hero, buffTypes[2].color);
    increaseHeroVelocityByBuff();
    const enemies = [...gameObject.smartEnemies, ...gameObject.dummyEnemies];
    enemies.forEach(enemy => enemy.speed /= value);

    const timer = setTimeout(() => {
      decreaseHeroVelocityByDebuff();
      enemies.forEach(enemy => enemy.speed *= value);
    }, buffParams.buffTime)
    gameObject.timers.push(timer);
  }
}