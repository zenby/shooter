import { Hero } from "./creatures/hero";
import { DummyEnemy, BASE_DUMMY_SIZE } from "./creatures/dummyEnemy";
import { SmartEnemy, BASE_SMART_SIZE } from "./creatures/smartEnemy";
import { addHeroControls } from "./controls";
import { isDistanceBetweenUnitsMoreThanSafe, ifUnitsTouchEachOther, getCenterCoordinates, mergeUnits } from "./utils";
import { Bullet } from "./creatures/bullet";
import { BuffItem } from './buffs/buff-item';
import { RandomBuff } from './buffs/buff-generator';

const score = document.querySelector(".score");

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.startTime = Date.now();
    this.currentTime = Date.now();

    this.canvas.width = 700;
    this.canvas.height = 700;
    this.ctx = this.canvas.getContext("2d");
    this.hero = new Hero(this.ctx);
    this.dummyEnemies = [];
    this.smartEnemies = [];
    this.heroBullets = [];
    this.timers = [];
    this.buffItem = '';
  }

  start() {
    const timer1 = setInterval(() => this.updateGame(), 10);
    const timer2 = setInterval(() => this.addEnemy(this.dummyEnemies, DummyEnemy, BASE_DUMMY_SIZE), 200000);
    const timer3 = setInterval(() => this.addEnemy(this.smartEnemies, SmartEnemy, BASE_SMART_SIZE), 600000);
    const timer4 = setInterval(() => this.addBuffItem(), 12000);
    this.timers.push(timer1, timer2, timer3, timer4);
    addHeroControls(this.hero, () => this.addBullet());
  }

  updateGame() {
    this.updateScore();
    this.updateCanvasState();
  }

  updateScore() {
    this.currentTime = this.currentTime + 10;
    const value = (this.currentTime - this.startTime) / 1000;
    score.innerHTML = value;
  }

  updateCanvasState() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
    this.buffItem && this.buffItem.draw(this.ctx);
    this.handleHeroPosition();
    this.handleDummyEnemiesPosition();
    this.handleSmartEnemiesPosition();
    this.handleHeroBulletsPosition();
    this.handleEnemiesDeath();
    this.handleHeroDeath();
    this.handleBuffs();
  }

  handleHeroPosition() {
    this.hero.newPos().update(this.ctx);
  }

  handleDummyEnemiesPosition() {
    this.dummyEnemies.forEach(enemy => enemy.newPos().update(this.ctx));
  }

  handleSmartEnemiesPosition() {
    this.smartEnemies = this.smartEnemies.reduce((newArray, currentEnemy) => {
      if (newArray.some(enemy => ifUnitsTouchEachOther(enemy, currentEnemy))) {
        return newArray;
      }
      const secondEnemy = this.smartEnemies.find(enemy => ifUnitsTouchEachOther(enemy, currentEnemy) && (enemy !== currentEnemy))
      if (secondEnemy) {
        currentEnemy = mergeUnits(currentEnemy, secondEnemy)
      }
      newArray.push(currentEnemy);
      return newArray;
    }, []);
    this.smartEnemies.forEach(currentEnemy => currentEnemy.newPos(this.hero).update(this.ctx))
  }

  handleHeroBulletsPosition() {
    let FIELD_WIDTH = this.ctx.canvas.clientWidth;
    let FIELD_HEIGHT = this.ctx.canvas.clientHeight;
    let isInsideCanvas;
    this.heroBullets = this.heroBullets.filter(bullet => {
      isInsideCanvas = bullet.x < FIELD_WIDTH && bullet.x > 0 && bullet.y < FIELD_HEIGHT && bullet.y > 0;
      if (isInsideCanvas) {
        bullet.newPos().update(this.ctx);
      }
      return isInsideCanvas;
    });
  }

  handleEnemiesDeath() {
    const newSmartEnemies = [];
    const newDummyEnemies = [];
    const newBullets = [];
    const allEnemies = [...this.smartEnemies, ...this.dummyEnemies]

    this.smartEnemies.forEach(enemy => {
      if (!this.heroBullets.some(bullet => this.shouldEnemyDieIfBulletHitsHim(enemy, bullet))) {
        newSmartEnemies.push(enemy)
      }
    })
    this.dummyEnemies.forEach(enemy => {
      if (!this.heroBullets.some(bullet => this.shouldEnemyDieIfBulletHitsHim(enemy, bullet))) {
        newDummyEnemies.push(enemy)
      }
    })
    this.heroBullets.forEach(bullet => {
      if (!allEnemies.some(enemy => this.shouldEnemyDieIfBulletHitsHim(enemy, bullet))) {
        newBullets.push(bullet)
      }
    })
    this.smartEnemies = newSmartEnemies;
    this.dummyEnemies = newDummyEnemies;
    this.heroBullets = newBullets;
  }

  handleHeroDeath() {
    if (!this.hero.isImmortal) {
      const DELTA = 5;
      const enemies = [...this.dummyEnemies, ...this.smartEnemies];
      if (enemies.some(enemy => ifUnitsTouchEachOther(this.hero, enemy, DELTA))) {
        setTimeout(() => {
          this.timers.map(timer => clearInterval(timer));
          alert("You lose");
        }, 5);
      }
    }
  }

  handleBuffs() {
    if (ifUnitsTouchEachOther(this.hero, this.buffItem)) {
      const TIME = 20000;
      this.buffItem.activateBuff(this, TIME);
      this.buffItem = ''
    }
  }

  shouldEnemyDieIfBulletHitsHim(enemy, bullet) {
    const MIN_SIZE = 25;
    const isContact = ifUnitsTouchEachOther(enemy, bullet)

    if (isContact) {
      enemy = this.damageUnit(enemy)
    }

    if (isContact && (enemy.width < MIN_SIZE || enemy.height < MIN_SIZE)) {
      return true;
    } else {
      return false
    }
  }

  damageUnit(unit) {
    const DAMAGE = 8;
    const s = unit.width * unit.height;
    const k = (s - DAMAGE) / s;
    unit.width *= k;
    unit.height *= k;
    return unit;
  }

  addEnemy(enemyArray, creatureConstructor, baseSize) {
    const { size, x, y, alfaX, alfaY } = this.generateRandomPositionAndDirection(this.hero, baseSize);
    const enemy = new creatureConstructor(this.ctx, size, size, x, y, alfaX, alfaY);
    enemyArray.push(enemy);
  }

  addBullet() {
    const [heroX, heroY] = getCenterCoordinates(this.hero);
    const { hero } = this;
    const direction = hero.dir.x === 0 && hero.dir.y === 0 ? hero.gunDir : hero.dir;
    const bullet = new Bullet(this.ctx, heroX, heroY, direction.x, direction.y);
    this.heroBullets.push(bullet);
  }

  addBuffItem() {
    const size = 20;
    const { x, y } = this.generateRandomPositionAndDirection(this.hero, 0);
    const buffItem = new RandomBuff(this.ctx, size, size, x, y);
    this.buffItem = buffItem;
  }

  generateRandomPositionAndDirection(hero, baseSize) {
    let x;
    let y;
    const size = Math.random() * 20 + baseSize;
    do {
      x = Math.random() * this.ctx.canvas.clientWidth;
      y = Math.random() * this.ctx.canvas.clientHeight;
    } while (!isDistanceBetweenUnitsMoreThanSafe(hero, { x, y, width: size, height: size }));

    const alfaX = Math.random() * 2 - 1;
    const alfaY = Math.random() * 2 - 1;

    return { x, y, alfaX, alfaY, size };
  }
}
