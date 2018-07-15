import { Hero } from "./creatures/hero";
import { DummyEnemy, BASE_DUMMY_SIZE } from "./creatures/dummyEnemy";
import { SmartEnemy, BASE_SMART_SIZE } from "./creatures/smartEnemy";
import { addHeroControls } from "./controls";
import { isDistanceBetweenCreaturesLowThanSearchable, ifCreaturesTouchEachOther, getCenterCoordinates } from "./utils";
import { Bullet } from "./creatures/bullet";

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
  }

  start() {
    const timer1 = setInterval(() => this.initializeGame(), 10);
    const timer2 = setInterval(() => this.addEnemy(this.dummyEnemies, DummyEnemy, BASE_DUMMY_SIZE), 4000);
    const timer3 = setInterval(() => this.addEnemy(this.smartEnemies, SmartEnemy, BASE_SMART_SIZE), 6000);
    this.timers.push(timer1, timer2, timer3);
    addHeroControls(this.hero, () => this.addBullet(this.heroBullets, Bullet));
  }

  initializeGame() {
    this.updateState();
    this.updateScore();
  }

  updateScore() {
    this.currentTime = this.currentTime + 10;
    const value = (this.currentTime - this.startTime) / 1000;
    score.innerHTML = value;
  }

  updateState() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
    this.hero.newPos().update(this.ctx);
    this.handleDummyEnemies();
    this.handleSmartEnemies();
    this.handleHeroBullets();
    this.handleEnemiesDeath();
    this.handleHeroDeath();
  }

  handleDummyEnemies() {
    this.dummyEnemies.forEach(enemy => enemy.newPos().update(this.ctx));
  }

  handleSmartEnemies() {
    this.smartEnemies = this.smartEnemies.reduce((newArray, currentEnemy, index, smartArray) => {
      currentEnemy.newPos(this.hero).update(this.ctx);
      if (newArray.some(enemy => ifCreaturesTouchEachOther(enemy, currentEnemy))) {
        return newArray;
      }
      if (smartArray.some(enemy => ifCreaturesTouchEachOther(enemy, currentEnemy) && enemy !== currentEnemy)) {
        currentEnemy.width *= 1.5;
        currentEnemy.height *= 1.5;
      }
      newArray.push(currentEnemy);
      return newArray;
    }, []);
  }

  handleHeroBullets() {
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

  handleHeroDeath() {
    const enemies = [...this.dummyEnemies, ...this.smartEnemies];
    if (enemies.some(enemy => ifCreaturesTouchEachOther(this.hero, enemy))) {
      setTimeout(() => {
        this.timers.map(timer => clearInterval(timer));
        alert("You lose");
      }, 5);
    }
  }

  handleEnemiesDeath() {
    const newSmartEnemies = [];
    const newDummyEnemies = [];
    const newBullets = [];
    const allEnemies = [...this.smartEnemies, ...this.dummyEnemies]

    this.smartEnemies.forEach(enemy => {
      if (!this.heroBullets.some(bullet => ifCreaturesTouchEachOther(enemy, bullet))) {
        newSmartEnemies.push(enemy)
      }
    })
    this.dummyEnemies.forEach(enemy => {
      if (!this.heroBullets.some(bullet => ifCreaturesTouchEachOther(enemy, bullet))) {
        newDummyEnemies.push(enemy)
      }
    })
    this.heroBullets.forEach(bullet => {
      if (!allEnemies.some(enemy => ifCreaturesTouchEachOther(enemy, bullet))) {
        newBullets.push(bullet)
      }
    })
    this.smartEnemies = newSmartEnemies;
    this.dummyEnemies = newDummyEnemies;
    this.heroBullets = newBullets;
  }

  addEnemy(enemyArray, creatureConstructor, baseSize) {
    const { size, x, y, alfaX, alfaY } = this.generateRandomPositionAndDirection(this.hero, baseSize);
    const enemy = new creatureConstructor(this.ctx, size, size, x, y, alfaX, alfaY);
    enemyArray.push(enemy);
  }

  addBullet(bulletArray, bulletConstructor) {
    const [heroX, heroY] = getCenterCoordinates(this.hero);
    const { hero } = this;
    const direction = hero.dir.x === 0 && hero.dir.y === 0 ? hero.gunDir : hero.dir;
    const bullet = new bulletConstructor(this.ctx, heroX, heroY, direction.x, direction.y);
    bulletArray.push(bullet);
  }

  generateRandomPositionAndDirection(hero, baseSize) {
    let x;
    let y;
    const size = Math.random() * 10 + baseSize;
    do {
      x = Math.random() * this.ctx.canvas.clientWidth;
      y = Math.random() * this.ctx.canvas.clientHeight;
    } while (isDistanceBetweenCreaturesLowThanSearchable(hero, { x, y, width: size, height: size }));

    const alfaX = Math.random() * 2 - 1;
    const alfaY = Math.random() * 2 - 1;

    return { x, y, alfaX, alfaY, size };
  }
}
