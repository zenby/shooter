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
    setTimeout(() => gameObject.hero.isImmortal = false, time)
  }
}