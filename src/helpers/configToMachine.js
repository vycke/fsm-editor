import autoLayout from './autoLayout';

const layoutConfig = { width: 100, height: 60, orientation: 'horizontal' };

function getStates(config) {
  const states = [];

  for (const key in config) {
    const state = { id: key, type: 'state', data: { label: key } };
    if (config[key].entry) {
      const token = config[key].entry.split(" => send('")[1];
      const action = token.split("'")[0];
      const delay = token.split('delay: ')?.[1]?.replace(' })', '');

      if (action) state.data.entry = action;
      if (delay) state.data.delay = delay;
    }
    states.push(state);
  }

  return states;
}

export function getTransitions(config) {
  const edges = [];

  for (const source in config) {
    const transitions = config[source].on;

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

      if (t?.cond) edge.data.guard = t?.cond;
      edges.push(edge);
    }
  }

  return edges;
}

export function configToMachine(start, orientation, config) {
  const string = config
    .replaceAll(/"cond": (.*?),*\n/gm, '"cond": "$1"\n')
    .replaceAll(/"entry": (.*?),*\n/gm, '"entry": "$1",\n')
    .replaceAll(/,\n]\s^"/gm, '\n');

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
