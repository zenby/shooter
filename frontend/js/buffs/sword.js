import { BuffItem } from './buff-item';
import { growBullet, shrinkBullet } from '../creatures/bullet';

export class Sword extends BuffItem {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    growBullet();
    setTimeout(() => shrinkBullet(), time)
  }

}