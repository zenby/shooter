import { Item } from './item';
import { growBullet, shrinkBullet } from '../../creatures/bullet';
import { addBuffIndicator } from '../../utils/effects'
import { buffTypes } from './buff-generator';

export class Sword extends Item {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    addBuffIndicator(gameObject.hero, buffTypes[0].color);
    growBullet();
    const timer = setTimeout(() => shrinkBullet(), time);
    gameObject.timers.push(timer);
  }
}