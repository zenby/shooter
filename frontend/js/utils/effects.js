import { BULLET } from '../creatures/bullet'

export function damageUnit(unit) {
  const { speedDecrease } = BULLET;
  const mass = unit.width * unit.height;

  const heroDamage = getHeroDamageToUnit(unit);
  const k = (mass - heroDamage) / mass;
  unit.width *= k;
  unit.height *= k;
  unit.speed > speedDecrease ? unit.speed -= speedDecrease : 0;
  return unit;
}

function getHeroDamageToUnit(unit) {
  const { damage } = BULLET;
  const minDamage = 4;
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
    if (buff.time >= 20) {
      clearInterval(buff.timer);
      hero.currentBuffs.shift();
    }
  }, 1000)
}

const buffTypes = ['red', 'black', 'red', 'green', 'orange']

export function generateBuffType() {
  return buffTypes[~~(Math.random() * 5)]
}