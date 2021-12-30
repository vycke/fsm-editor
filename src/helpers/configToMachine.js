import autoLayout from './autoLayout';

const layoutConfig = { width: 100, height: 60, orientation: 'horizontal' };

function getStates(config) {
  const states = [];

  for (const key in config) {
    const state = { id: key, type: 'state', data: { label: key } };
    if (config[key]._entry) state.data._entry = config[key]._entry;
    if (config[key]._exit) state.data._exit = config[key]._exit;
    states.push(state);
  }

  return states;
}

export function getTransitions(config) {
  const edges = [];

  for (const source in config) {
    const { _entry, _exit, ...transitions } = config[source];

    for (const name in transitions) {
      const t = transitions[name];
      const target = t?.target || t;

      const edge = {
        id: `${source}_${target}_${name}`,
        source,
        target,
        type: 'transition',
        data: { label: name },
      };

      if (t?.guard) edge.data.guard = t.guard;
      if (t?.actions) edge.data.actions = t.actions;
      edges.push(edge);
    }
  }

  return edges;
}

export function configToMachine(start, orientation, config) {
  const string = config
    .replaceAll(/\((.*?),*\n/gm, '"($1",\n')
    .replaceAll(/,\n\s*]/gm, '\n]')
    .replaceAll(/,\n\s*}/gm, '\n}');

  try {
    const newConfig = JSON.parse(string);
    const nodes = getStates(newConfig);
    const edges = getTransitions(newConfig);

    return autoLayout(start, nodes, edges, orientation);
  } catch (e) {
    console.log(e);
    return;
  }
}
