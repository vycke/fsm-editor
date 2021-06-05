import { digl } from '@crinkles/digl';

const layoutConfig = { width: 165, height: 75, orientation: 'horizontal' };

export default function autoLayout(start, nodes, edges, orientation) {
  const positions = digl({
    ...layoutConfig,
    orientation,
  }).positions(
    start,
    nodes.map(({ id }) => ({ id })),
    edges.map(({ source, target }) => ({ source, target }))
  );

  const positionedNodes = nodes.map((n) => {
    const pos = positions.find((r) => r.id === n.id);
    return { ...n, position: { x: pos.x, y: pos.y } };
  });

  return positionedNodes;
}
