import { BuffItem } from './buff-item';

export class Shield extends BuffItem {
  constructor(ctx, width, height, x, y, type) {
    super(ctx, width, height, x, y, type);
  }

  activateBuff(gameObject, time) {
    gameObject.hero.isImmortal = true;
    setTimeout(() => gameObject.hero.isImmortal = false, time)
  }
}