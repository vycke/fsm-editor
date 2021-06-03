import { layout } from '@crinkles/digl';

const layoutConfig = { width: 100, height: 60, orientation: 'horizontal' };

export default function autoLayout(start, nodes, edges, orientation) {
  const positions = layout({
    ...layoutConfig,
    orientation,
  })(
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
