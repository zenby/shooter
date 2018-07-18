import { Item } from './item';
import { addBuffIndicator } from '../../utils/effects'
import { buffTypes } from './buff-generator';

export class Shield extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    addBuffIndicator(gameObject.hero, buffTypes[1].color);
    gameObject.hero.isImmortal = true;
    const timer = setTimeout(() => {
      const hasAnotherShield = gameObject.hero.currentBuffs.some(buff => buff.color === buffTypes[1].color);
      gameObject.hero.isImmortal = !hasAnotherShield;
    }, time)
    gameObject.timers.push(timer);
  }
}