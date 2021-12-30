// machine to a config object that has replaceable parts
function machineToConfig(nodes, edges) {
  // Initial convertion
  const config = {};
  nodes.forEach((n) => {
    config[n.data.label] = {};
    if (n.data?._entry?.length)
      config[n.data.label]._entry = n.data._entry.map((a) => `{{${a}}}`);
    if (n.data?._exit?.length)
      config[n.data.label]._exit = n.data._exit.map((a) => `{{${a}}}`);
  });

  edges.forEach((e) => {
    const { data: source } = nodes.find((n) => n.id === e.source);
    const { data: target } = nodes.find((n) => n.id === e.target);

    if (e.data.guard || e.data?.actions?.length)
      config[source.label][e.data.label] = { target: target.label };
    else config[source.label][e.data.label] = target.label;

    if (e.data.guard)
      config[source.label][e.data.label].guard = `{{${e.data.guard}}}`;
    if (e.data?.actions?.length)
      config[source.label][e.data.label].actions = e.data.actions.map(
        (a) => `{{${a}}}`
      );
  });

  return config;
}

// prepare for copy to clipboard
export function stringifyMachine(nodes, edges) {
  return JSON.stringify(machineToConfig(nodes, edges), null, 2)
    .replaceAll('"{{', '')
    .replaceAll('}}"', '');
}
