import { currentBullet } from '../creatures/bullet'
import { initialParams } from '../constants';
import { ifUnitsTouchEachOther } from './geometry';

const { buffParams } = initialParams;

export function shouldEnemyDieIfBulletHitsHim(enemy, bullet) {
  const MIN_SIZE = 25;
  const isContact = ifUnitsTouchEachOther(enemy, bullet)
  if (isContact) {
    enemy = damageUnit(enemy)
  }
  if (isContact && (enemy.width < MIN_SIZE || enemy.height < MIN_SIZE)) {
    return true;
  } else {
    return false
  }
}

function damageUnit(unit) {
  const { speedDecrease } = currentBullet;
  const mass = unit.width * unit.height;

  const heroDamage = getHeroDamageToUnit(unit);
  const k = (mass - heroDamage) / mass;
  unit.width *= k;
  unit.height *= k;
  unit.speed > speedDecrease ? unit.speed -= speedDecrease : 0;
  return unit;
}

function getHeroDamageToUnit(unit) {
  const { damage } = currentBullet;
  const minDamage = 6;
  const defense = unit.defense || 0;
  return damage - defense > 0 ? damage - defense : minDamage;
}

export function addBuffIndicator(hero, color) {
  const id = Date.now();
  const newBuff = {
    id: id,
    time: 0,
    type: color,
  }
  hero.currentBuffs.push(newBuff)
  addBuffTimerToHero(hero, id)
}

function addBuffTimerToHero(hero, id) {
  const buff = hero.currentBuffs.find(buff => id === buff.id)
  buff.timer = setInterval(() => {
    buff.time += 1;
    if (buff.time >= buffParams.buffTime / 1000) {
      clearInterval(buff.timer);
      hero.currentBuffs.shift();
    }
  }, 1000)
}
