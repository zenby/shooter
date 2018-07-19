import { Item } from './item';
import { addBuffIndicator } from '../../utils/effectsUtils'
import { buffTypes } from './buffGenerator';
import { buffParams } from '../../constants';

export class Shield extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject) {
    addBuffIndicator(gameObject.hero, buffTypes[1].color);
    gameObject.hero.isImmortal = true;
    const timer = setTimeout(() => {
      const hasAnotherShield = gameObject.hero.currentBuffs.some(buff => buff.color === buffTypes[1].color);
      gameObject.hero.isImmortal = !hasAnotherShield;
    }, buffParams.buffTime)
    gameObject.timers.push(timer);
  }
}