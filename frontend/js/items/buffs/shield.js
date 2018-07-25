import { Item } from './item';
import { addBuffIndicator } from '../../utils/effectsUtils'
import { buffTypes } from './buffGenerator';

export class Shield extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject) {
    addBuffIndicator(gameObject.hero, buffTypes[1].color);
    gameObject.hero.isImmortal = true;
  }
}