

export const initialParams = {
  heroParams: {
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
  },
  dummyEnemyParams: {
    speed: 0.8,
    size: 25,
    spriteLayer: {
      top: 3,
      left: 1,
      right: 0,
      bottom: 2
    }
  },
  smartEnemyParams: {
    speed: 0.6,
    size: 25,
    message: {
      x: 10,
      y: 5,
      font: "13px Arial"
    },
    defenseIncrease: 3,
    speedIncrease: 0.1
  },
  bulletParams: {
    speed: 10,
    color: 'black',
    size: 5,
    damage: 20,
    speedDecrease: 0.10,
    growAfterBuff: 2
  },
  buffParams: {
    buffTime: 20000,
    speedGrowth: 2,
  }
}