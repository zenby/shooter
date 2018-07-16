export function getCenterCoordinates(unit) {
  return [unit.x + 0.5 * unit.width, unit.y + 0.5 * unit.height];
}

export function getDistanceBetweenUnits(unit1, unit2) {
  const [x1, y1] = getCenterCoordinates(unit1);
  const [x2, y2] = getCenterCoordinates(unit2);
  return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
}

const PIXEL_BORDER = 2
export function ifUnitsTouchEachOther(unit1, unit2, delta = 0) {
  const [x1, y1] = getCenterCoordinates(unit1);
  const [x2, y2] = getCenterCoordinates(unit2);
  return (
    Math.abs(x2 - x1) < (unit1.width + unit2.width - PIXEL_BORDER - delta) / 2
    && Math.abs(y2 - y1) < (unit1.height + unit2.height - PIXEL_BORDER - delta) / 2
  );
}

const SAFE_DISTANCE = 200;

export function isDistanceBetweenUnitsMoreThanSafe(unit1, unit2, dist = SAFE_DISTANCE) {
  return getDistanceBetweenUnits(unit1, unit2) > dist;
}

export function mergeUnits(unit1, unit2) {
  const s1 = unit1.width * unit1.height;
  const s2 = unit2.width * unit2.height
  const k = Math.pow((s1 + s2) / s1, 0.5)
  unit1.width *= k;
  unit1.height *= k;
  return unit1;
}
