import { Sword } from './sword';
import { Shield } from './shield';
import { Shoes } from './shoes';

const buffTypes = [{
  selector: '.sword',
  constructor: Sword,
}, {
  selector: '.shield',
  constructor: Shield,
}, {
  selector: '.shoes',
  constructor: Shoes,
}]

export function RandomBuff(ctx, width, height, x, y) {
  const buffType = buffTypes[~~(Math.random() * 3)]
  const constructor = buffType.constructor
  return new constructor(ctx, width, height, x, y, buffType.selector);
};