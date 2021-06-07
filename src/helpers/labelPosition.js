import { getCorner, getMiddle } from './paths';

const leftRight = ['left', 'right'];
const topBottom = ['bottom', 'top'];

export default function getLabelPosition(s, t, offset = 14.5) {
  let x, y;

  if (s.id === t.id) {
    [x, y] = getCorner(s, t);
    y -= offset;
  } else if (s.pos === t.pos) {
    [x, y] = getMiddle(s, t, topBottom.includes(s.pos) ? 60 : 75);
    y -= offset;
  } else if (
    (leftRight.includes(s.pos) && leftRight.includes(t.pos)) ||
    (topBottom.includes(s.pos) && topBottom.includes(t.pos))
  ) {
    x = s.x + (t.x - s.x) / 2;
    y = s.y + (t.y - s.y) / 2 - offset;
  } else if (topBottom.includes(s.pos)) {
    x = s.x;
    y = t.y - offset;
  } else {
    x = t.x;
    y = s.y - offset;
  }

  return [x, y];
}
