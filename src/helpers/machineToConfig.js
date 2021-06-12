// machine to a config object that has replaceable parts
function machineToConfig(nodes, edges) {
  // Initial convertion
  const config = {};
  nodes.forEach((n) => {
    config[n.data.label] = {};
    if (n.data.entry) {
      const str = `[send('${n.data.entry}', ${n.data.delay || 0})]`.replace(
        ', 0',
        ''
      );
      config[n.data.label].entry = str;
    }
  });

  edges.forEach((e) => {
    const { data: source } = nodes.find((n) => n.id === e.source);
    const { data: target } = nodes.find((n) => n.id === e.target);

    if (!config[source.label].on) config[source.label].on = {};

    if (e.data.guard) {
      config[source.label].on[e.data.label] = {
        target: target.label,
        cond: `[${e.data.guard}]`,
      };
    } else {
      config[source.label].on[e.data.label] = target.label;
    }
  });

  return config;
}

// prepare for copy to clipboard
export function stringifyMachine(nodes, edges) {
  return JSON.stringify(machineToConfig(nodes, edges), null, 2)
    .replaceAll('"[', '')
    .replaceAll(']"', '');
}
