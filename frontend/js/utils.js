export function getCenterCoordinates(creature) {
  return [creature.x + 0.5 * creature.width, creature.y + 0.5 * creature.height];
}

export function getDistanceBetweenCreatures(item1, item2) {
  const [x1, y1] = getCenterCoordinates(item1);
  const [x2, y2] = getCenterCoordinates(item2);
  return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
}

export function ifCreaturesTouchEachOther(item1, item2, delta = 0) {
  const [x1, y1] = getCenterCoordinates(item1);
  const [x2, y2] = getCenterCoordinates(item2);
  return (
    Math.abs(x2 - x1) < (item1.width + item2.width - 2 - delta) / 2 && Math.abs(y2 - y1) < (item1.height + item2.height - 2 - delta) / 2
  );
}

const SAFE_DISTANCE = 200;

export function isDistanceBetweenCreaturesLowThanSearchable(item1, item2, dist = SAFE_DISTANCE) {
  return getDistanceBetweenCreatures(item1, item2) < dist;
}
