import { currentBullet } from '../creatures/bullet'
import { buffParams, bulletParams } from '../constants';
import { ifUnitsTouchEachOther } from './geometryUtils';
import { buffTypes } from '../items/buffs/buffGenerator';

export function shouldEnemyDieIfBulletHitsHim(enemy, bullet) {
  const isContact = ifUnitsTouchEachOther(enemy, bullet)
  if (isContact) {
    enemy = damageUnit(enemy)
  }
  if (isContact && (enemy.width < bulletParams.minCreatureSize || enemy.height < bulletParams.minCreatureSize)) {
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
  const defense = unit.defense || 0;
  return damage - defense > 0 ? damage - defense : bulletParams.minDamage;
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
      const hasAnotherShield = hero.currentBuffs.some(buff => buff.type === buffTypes[1].color)
      hero.isImmortal = hasAnotherShield;
    }
  }, 1000)
}
