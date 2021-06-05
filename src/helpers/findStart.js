export default function findStart(nodes, edges) {
  const targets = edges.map((e) => e.target);
  return nodes.find((n) => !targets.includes(n.id)) || nodes[0];
}
