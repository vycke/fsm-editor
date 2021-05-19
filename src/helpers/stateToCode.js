export default function stateToCode(nodes, edges) {
  // Initial convertion
  const config = {};
  nodes.forEach((n) => (config[n.data.label] = {}));
  edges.forEach((e) => {
    const { data: source } = nodes.find((n) => n.id === e.source);
    const { data: target } = nodes.find((n) => n.id === e.target);

    if (!config[source.label].on) config[source.label] = { on: {} };

    config[source.label].on[e.label] = target.label;
  });

  return config;
}
