export const HERO_PARAMS = {
  height: 50,
  width: 30,
  posX: 50,
  posY: 50,
  spriteLayer: {
    top: 3,
    left: 1,
    right: 2,
    bottom: 0
  }
}

export const BUFF_PARAMS = {
  buffTime: 20000,
  speedGrowth: 1.6,
}

export const BULLET_PARAMS = {
  speed: 10,
  color: 'red',
  colorSecond: 'yellow',
  size: 5,
  damage: 35,
  speedDecrease: 0.10,
  growAfterBuff: 2,
  minDamage: 10,
  minCreatureSize: 30
}

export const SMART_ENEMY_PARAMS = {
  speed: 0.6,
  size: 25,
  message: {
    x: 10,
    y: 5,
    font: "13px Arial"
  },
  spriteLayer: {
    top: 3,
    left: 1,
    right: 2,
    bottom: 0
  },
  defenseIncrease: 3,
  speedIncrease: 0.1,
  maxSize: 100,
  fearDistance: 300,
  visibilityDistance: 200
}

export const DUMMY_ENEMY_PARAMS = {
  speed: 0.8,
  size: 25,
  spriteLayer: {
    top: 3,
    left: 1,
    right: 2,
    bottom: 0
  }
}

export const INTERVALS = {
  updateGameState: 20,
  updateSprites: 200,
  addSmartEnemy: 3000,
  addDummyEnemy: 40000,
  addBuffItem: 8000,
  lvlUp: 13000
}

export const LVL_BUFFS = {
  speedIncrease: 0.25,
  sizeIncrease: 2
}