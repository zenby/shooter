import { Item } from './item';
import { growBullet, shrinkBullet } from '../../creatures/bullet';
import { addBuffIndicator } from '../../utils/effectsUtils'
import { buffTypes } from './buffGenerator';
import { BUFF_PARAMS } from '../../constants';

export class Sword extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject) {
    addBuffIndicator(gameObject.hero, buffTypes[0].color);
    growBullet();
    const timer = setTimeout(() => shrinkBullet(), BUFF_PARAMS.buffTime);
    gameObject.timers.push(timer);
  }
}