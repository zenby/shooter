import { Sword } from './sword';
import { Shield } from './shield';
import { Shoes } from './shoes';

export const buffTypes = [{
  selector: '.sword',
  constructor: Sword,
  color: 'red'
}, {
  selector: '.shield',
  constructor: Shield,
  color: 'black'
}, {
  selector: '.shoes',
  constructor: Shoes,
  color: 'blue'
}]

export function RandomBuff(ctx, width, height, x, y) {
  const buffType = buffTypes[~~(Math.random() * 3)]
  const buff = buffType.constructor
  return new buff(ctx, width, height, x, y, buffType.selector);
};