import { Hero } from "./creatures/hero";
import { DummyEnemy, BASE_DUMMY_SIZE, SPEED as DUMMY_SPEAD } from "./creatures/dummyEnemy";
import { SmartEnemy, BASE_SMART_SIZE } from "./creatures/smartEnemy";
import { addHeroControls } from "./utils/controls";
import { isDistanceBetweenUnitsMoreThanSafe, ifUnitsTouchEachOther, getCenterCoordinates, getElementsInsideCanvas } from "./utils/geometry";
import { clearCanvas } from './utils/canvas';
import { Bullet, makeBulletDefault } from "./creatures/bullet";
import { RandomBuff } from './items/buffs/buff-generator';
import { initializeGame, updateLevel, showLoseMessage, showReplayButton, subscribeToShowReplay, updateScore } from './main';
import { Landscape } from './items/landscape';
import { shouldEnemyDieIfBulletHitsHim } from './utils/effects';
import { addSnapshotToReplay, showReplay } from './replay';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 700;
    this.canvas.height = 700;
    this.ctx = this.canvas.getContext("2d");

    this.startTime = Date.now();
    this.currentTime = Date.now();

    this.hero = new Hero(this.ctx);
    this.landscape = new Landscape(this.ctx, 40, 40)
    this.dummyEnemies = [];
    this.smartEnemies = [];
    this.heroBullets = [];
    this.timers = [];
    this.lvl = 1;
    this.buffItem = '';
    this.replay = { landscape: this.landscape, units: [] };
    // this.drawLandscape();
    this.handleHeroPosition();
  }

  start() {
    const timer1 = setInterval(() => this.updateGameState(), 20);
    const timer2 = setInterval(() => this.updateSprites(), 200);
    const timer3 = setInterval(() => this.addEnemy(this.smartEnemies, SmartEnemy, BASE_SMART_SIZE), 2000);
    const timer4 = setInterval(() => this.addEnemy(this.dummyEnemies, DummyEnemy, BASE_DUMMY_SIZE), 4000);
    const timer5 = setInterval(() => this.addBuffItem(), 8000);
    const timer6 = setInterval(() => this.lvlUp(), 10000)
    this.timers.push(timer1, timer2, timer3, timer4, timer5, timer6);
    addHeroControls(this.hero, (x, y) => this.addBullet(x, y));
  }

  updateGameState() {
    this.updateCanvasState();
    this.currentTime = updateScore(this.currentTime, this.startTime);
    addSnapshotToReplay(this.replay.units, this.currentTime - this.startTime, this.hero, this.dummyEnemies, this.smartEnemies, this.heroBullets, this.buffItem, this.lvl);
  }

  updateSprites() {
    const units = [this.hero, ...this.dummyEnemies, ...this.smartEnemies];
    units.forEach(sprite => sprite.setNextSprite());
  }

  updateCanvasState() {
    clearCanvas(this.ctx);
    // this.drawLandscape();
    this.handleHeroDeath();
    this.handleHeroPosition();
    this.handleBuffItemPosition();
    this.heroBullets = getElementsInsideCanvas(this.ctx, this.heroBullets);
    this.handleDummyEnemiesPosition();
    this.handleSmartEnemiesPosition();
    this.handleEnemiesDeath();
    this.handleBuffs();
  }

  drawLandscape() {
    this.landscape.draw(this.ctx);
  }

  handleHeroPosition() {
    this.hero.newPos().update(this.ctx).drawBuffs(this.ctx);
  }

  handleBuffItemPosition() {
    this.buffItem && this.buffItem.draw(this.ctx);
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
        currentEnemy.eat(secondEnemy);
      }
      newArray.push(currentEnemy);
      return newArray;
    }, []);
    this.smartEnemies.forEach(currentEnemy => currentEnemy.newPos(this.hero).update(this.ctx))
  }

  handleEnemiesDeath() {
    const newSmartEnemies = [];
    const newDummyEnemies = [];
    const newBullets = [];
    const allEnemies = [...this.smartEnemies, ...this.dummyEnemies]

    this.smartEnemies.forEach(enemy => {
      if (!this.heroBullets.some(bullet => shouldEnemyDieIfBulletHitsHim(enemy, bullet))) {
        newSmartEnemies.push(enemy)
      }
    })
    this.dummyEnemies.forEach(enemy => {
      if (!this.heroBullets.some(bullet => shouldEnemyDieIfBulletHitsHim(enemy, bullet))) {
        newDummyEnemies.push(enemy)
      }
    })
    this.heroBullets.forEach(bullet => {
      if (!allEnemies.some(enemy => shouldEnemyDieIfBulletHitsHim(enemy, bullet))) {
        newBullets.push(bullet)
      }
    })
    this.smartEnemies = newSmartEnemies;
    this.dummyEnemies = newDummyEnemies;
    this.heroBullets = newBullets;
  }

  handleHeroDeath() {
    if (!this.hero.isImmortal) {
      const DELTA = 10;
      const enemies = [...this.dummyEnemies, ...this.smartEnemies];
      if (enemies.some(enemy => ifUnitsTouchEachOther(this.hero, enemy, DELTA))) {
        this.finishGame();
      }
    }
  }

  finishGame() {
    showReplayButton();
    this.clearPreviousGameState();
    showLoseMessage();
    subscribeToShowReplay(() =>
      showReplay(this.replay, this.ctx)
    );
    document.addEventListener('keydown', initializeGame, { once: true });
  }

  clearPreviousGameState() {
    this.timers.map(timer => clearInterval(timer));
    this.hero.currentBuffs.map(buff => clearInterval(buff.timer));
    makeBulletDefault();
  }

  handleBuffs() {
    if (ifUnitsTouchEachOther(this.hero, this.buffItem)) {
      this.buffItem.activateBuff(this);
      this.buffItem = ''
    }
  }

  lvlUp() {
    this.addEnemyStack(this.smartEnemies, SmartEnemy, BASE_SMART_SIZE);
    this.addEnemyStack(this.dummyEnemies, DummyEnemy, BASE_DUMMY_SIZE);
    this.lvl++;
    updateLevel(this.lvl);
  }

  addEnemy(enemyArray, creatureConstructor, baseSize) {
    const { size, x, y, alfaX, alfaY } = this.generateRandomPositionAndDirection(this.hero, baseSize);
    const enemy = new creatureConstructor(this.ctx, size, size, x, y, alfaX, alfaY, DUMMY_SPEAD + 0.15 * this.lvl);
    enemyArray.push(enemy);
  }

  addEnemyStack(enemyArray, creatureConstructor, baseSize) {
    const { size, x, y, alfaX, alfaY } = this.generateRandomPositionAndDirection(this.hero, baseSize);
    const enemy = new creatureConstructor(this.ctx, size, size, x, y, alfaX, alfaY);
    enemyArray.push(enemy);
    for (let i = 0; i < this.lvl; i++) {
      const { size, x, y } = this.generateRandomPositionAndDirection(enemy, baseSize, true, 100);
      const newEnemy = new creatureConstructor(this.ctx, size, size, x, y, alfaX, alfaY);
      enemyArray.push(newEnemy);
    }
  }

  addBullet(x, y) {
    const [heroX, heroY] = getCenterCoordinates(this.hero);
    const angle = Math.atan2(heroX - x, heroY - y) + Math.PI;
    const bullet = new Bullet(this.ctx, heroX, heroY, Math.sin(angle), Math.cos(angle));
    this.heroBullets.push(bullet);
  }

  addBuffItem() {
    const size = 20;
    const { x, y } = this.generateRandomPositionAndDirection(this.hero, 0);
    const buffItem = new RandomBuff(this.ctx, size, size, x, y);
    this.buffItem = buffItem;
  }

  generateRandomPositionAndDirection(hero, baseSize, isInsideCircle = false, distance = 200) {
    let x;
    let y;
    const size = Math.random() * 20 + baseSize + this.lvl * 5;
    let condition;
    do {
      x = Math.random() * this.ctx.canvas.clientWidth;
      y = Math.random() * this.ctx.canvas.clientHeight;
      const newUnit = { x, y, width: size, height: size };
      condition = isDistanceBetweenUnitsMoreThanSafe(hero, newUnit, distance);
    } while (isInsideCircle ? condition : !condition);

    const alfaX = Math.random() * 2 - 1;
    const alfaY = Math.random() * 2 - 1;

    return { x, y, alfaX, alfaY, size };
  }
}
