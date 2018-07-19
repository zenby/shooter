import { Item } from './item';
import { growBullet, shrinkBullet } from '../../creatures/bullet';
import { addBuffIndicator } from '../../utils/effects'
import { buffTypes } from './buff-generator';
import { buffParams } from '../../constants';

export class Sword extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject) {
    addBuffIndicator(gameObject.hero, buffTypes[0].color);
    growBullet();
    const timer = setTimeout(() => shrinkBullet(), buffParams.buffTime);
    gameObject.timers.push(timer);
  }
}