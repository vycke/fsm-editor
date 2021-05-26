const leftRight = ['left', 'right'];
const topBottom = ['bottom', 'top'];

const lt = (x, y, size = 5) => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`;
const rt = (x, y, size = 5) => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`;
const lb = (x, y, size = 5) => `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`;
const rb = (x, y, size = 5) => `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`;
const tl = (x, y, size = 5) => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`;
const tr = (x, y, size = 5) => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`;
const bl = (x, y, size = 5) => `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`;
const br = (x, y, size = 5) => `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`;

export function getCorner(s, t, offset = 45) {
  let x, y;
  if (topBottom.includes(s.pos)) y = s.y <= t.y ? s.y - offset : s.y + offset;
  else y = s.y <= t.y ? t.y + offset : t.y - offset;

  if (leftRight.includes(s.pos)) x = s.x <= t.x ? s.x - offset : s.x + offset;
  else x = s.x <= t.x ? t.x + offset : t.x - offset;

  return [x, y];
}

export default function getLoopPath(s, t, offset = 45) {
  let p1, p2, p3;
  const [x, y] = getCorner(s, t, offset);

  if (s.pos === 'top') {
    p1 = t.pos === 'right' ? lt(s.x, y) : rt(s.x, y);
    p2 = t.pos === 'right' ? tr(x, y) : tl(x, y);
    p3 = t.pos === 'right' ? rb(x, t.y) : lb(x, t.y);
  } else if (s.pos === 'bottom') {
    p1 = t.pos === 'right' ? lb(s.x, y) : rb(s.x, y);
    p2 = t.pos === 'right' ? br(x, y) : bl(x, y);
    p3 = t.pos === 'right' ? rt(x, t.y) : lt(x, t.y);
  } else if (s.pos === 'left') {
    p1 = t.pos === 'top' ? bl(x, s.y) : tl(x, s.y);
    p2 = t.pos === 'top' ? lt(x, y) : lb(x, y);
    p3 = t.pos === 'top' ? tr(t.x, y) : br(t.x, y);
  } else if (s.pos === 'right') {
    p1 = t.pos === 'top' ? br(x, s.y) : tr(x, s.y);
    p2 = t.pos === 'top' ? rt(x, y) : rb(x, y);
    p3 = t.pos === 'top' ? tl(t.x, y) : bl(t.x, y);
  }

  return `M ${s.x},${s.y} ${p1} ${p2} ${p3} L ${t.x},${t.y}`;
}
