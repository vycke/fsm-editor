const leftRight = ['left', 'right'];
const topBottom = ['bottom', 'top'];

function getLoopCorner(s, t, offset = 25) {
  let x, y;
  if (topBottom.includes(s.pos)) y = s.y <= t.y ? s.y - offset : s.y + offset;
  else y = s.y <= t.y ? t.y + offset : t.y - offset;

  if (leftRight.includes(s.pos)) x = s.x <= t.x ? s.x - offset : s.x + offset;
  else x = s.x <= t.x ? t.x + offset : t.x - offset;

  return [x, y];
}

export default function getLabelPosition(source, target, offset = 12) {
  let x, y;

  if (source.id === target.id) {
    [x, y] = getLoopCorner(source, target);
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
