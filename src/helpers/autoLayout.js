import { digl } from '@crinkles/digl';

const layoutConfig = { width: 165, height: 75, orientation: 'horizontal' };

function findRankPosition(ranks, edge) {
  let p1, p2;

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < ranks[i].length; j++) {
      if (ranks[i][j] === edge.source) p1 = { x: i, y: j };
      if (ranks[i][j] === edge.target) p2 = { x: i, y: j };
    }
  }

  return [p1, p2];
}

export default function autoLayout(start, nodes, edges, orientation) {
  const layout = digl({ ...layoutConfig, orientation });

  console.log(start, nodes, edges);

  const positions = layout.positions(start, nodes, edges);
  const ranks = layout.ranks(start, edges);

  const positionedNodes = nodes.map((n) => {
    const pos = positions.find((r) => r.id === n.id);
    return { ...n, position: { x: pos.x, y: pos.y } };
  });

  const horizontal = orientation === 'horizontal';

  // array of all handled edges to identify duplicates;
  const handled = [];

  const positionedEdges = edges.map((e) => {
    const newEdge = { ...e };

    const pos = findRankPosition(ranks, e);
    // Source === target
    if (e.source === e.target) {
      newEdge.sourceHandle = horizontal ? 'right' : 'bottom';
      newEdge.targetHandle = horizontal ? 'bottom' : 'left';
      // rank(source) === rank(target)
    } else if (pos[0].x === pos[1].x) {
      newEdge[pos[0].y < pos[1].y ? 'sourceHandle' : 'targetHandle'] =
        horizontal ? 'bottom' : 'right';
      newEdge[pos[0].y < pos[1].y ? 'targetHandle' : 'sourceHandle'] =
        horizontal ? 'top' : 'left';
      // Non-first edge between source & target
    } else if (handled.includes(`${e.source}-${e.target}`)) {
      newEdge.sourceHandle = horizontal ? 'right' : 'bottom';
      newEdge.targetHandle = horizontal ? 'top' : 'right';

      const node = positionedNodes.find((n) => n.id === e.target);
      const index = positionedNodes.findIndex((n) => n.id === e.target);

      if (node && horizontal) node.position.y = node.position.y + 50;
      if (node && !horizontal) node.position.x = node.position.x - 120;
    } else {
      newEdge.sourceHandle = horizontal ? 'right' : 'bottom';
      newEdge.targetHandle = horizontal ? 'left' : 'top';
    }

    const source = nodes.find((n) => n.id === e.source);
    if (source.data.entry === e.data.label) newEdge.animated = true;

    handled.push(`${e.source}-${e.target}`);
    return newEdge;
  });

  return [...positionedNodes, ...positionedEdges];
}
