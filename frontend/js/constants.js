export const heroParams = {
  height: 50,
  width: 30,
  posX: 50,
  posY: 50,
  spriteLayer: {
    top: 2,
    left: 3,
    right: 0,
    bottom: 1
  }
}

export const buffParams = {
  buffTime: 20000,
  speedGrowth: 1.6,
}

export const bulletParams = {
  speed: 10,
  color: 'black',
  size: 5,
  damage: 35,
  speedDecrease: 0.10,
  growAfterBuff: 2,
  minDamage: 10,
  minCreatureSize: 25
}

export const smartEnemyParams = {
  speed: 0.6,
  size: 25,
  message: {
    x: 10,
    y: 5,
    font: "13px Arial"
  },
  defenseIncrease: 3,
  speedIncrease: 0.1,
  maxSize: 100,
  fearDistance: 300,
  visibilityDistance: 200
}

export const dummyEnemyParams = {
  speed: 0.8,
  size: 25,
  spriteLayer: {
    top: 3,
    left: 1,
    right: 0,
    bottom: 2
  }
}

export const intervals = {
  updateGameState: 20,
  updateSprites: 200,
  addSmartEnemy: 3000,
  addDummyEnemy: 4000,
  addBuffItem: 8000,
  lvlUp: 13000
}

export const lvlBuffs = {
  speedIncrease: 0.25,
  sizeIncrease: 2
}