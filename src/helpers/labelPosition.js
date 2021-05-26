import { getCorner } from './getLoopPath';

const leftRight = ['left', 'right'];
const topBottom = ['bottom', 'top'];

export default function getLabelPosition(source, target, offset = 12) {
  let x, y;

  if (source.id === target.id) {
    [x, y] = getCorner(source, target);
    y -= offset;
  } else if (
    (leftRight.includes(source.pos) && leftRight.includes(target.pos)) ||
    (topBottom.includes(source.pos) && topBottom.includes(target.pos))
  ) {
    x = source.x + (target.x - source.x) / 2;
    y = source.y + (target.y - source.y) / 2 - offset;
  } else if (topBottom.includes(source.pos)) {
    x = source.x;
    y = target.y - offset;
  } else {
    x = target.x;
    y = source.y - offset;
  }

  return [x, y];
}
