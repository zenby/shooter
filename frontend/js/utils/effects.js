import { BULLET } from '../creatures/bullet'

export function damageUnit(unit) {
  const { speedDecrease } = BULLET;
  const mass = unit.width * unit.height;

  const heroDamage = getHeroDamage(unit);
  const k = (mass - heroDamage) / mass;
  unit.width *= k;
  unit.height *= k;
  unit.speed > speedDecrease ? unit.speed -= speedDecrease : 0;
  return unit;
}

function getHeroDamage(unit) {
  const { damage } = BULLET;
  const minDamage = 4;
  const defense = unit.defense || 0;
  return damage - defense > 0 ? damage - defense : minDamage;
}