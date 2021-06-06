import { AppContext } from 'App';
import useToastManager from 'components/Toast';
import { configToMachine } from 'helpers/configToMachine';
import createImage from 'helpers/createImage';
import findStart from 'helpers/findStart';
import generateId from 'helpers/generateId';
import { stringifyMachine } from 'helpers/machineToConfig';
import { store } from 'hooks/useStore';
import { useContext } from 'react';
import { addEdge, useStoreState, useZoomPanHelper } from 'react-flow-renderer';

export default function useCommands() {
  const { setElements } = useContext(AppContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const { add } = useToastManager();
  const { fitView } = useZoomPanHelper();

  function createState(v) {
    const tokens = v.split(',');

    const node = {
      id: generateId(),
      type: 'state',
      data: { label: tokens[0] || '' },
      position: { x: tokens[1] || 0, y: tokens[2] || 0 },
    };

    setElements((es) => es.concat(node));
    add(`State '${tokens[0]}' added`);
  }

  function deleteState(v) {
    setElements((es) => es.filter((e) => e.data.label !== v));
    add(`State '${v}' deleted`);
  }

  function connect(v) {
    const tokens = v.split(',');
    if (!tokens.every((t) => nodes.map((n) => n.data.label).includes(t))) {
      add('No valid source/target');
      return;
    }

    const edge = {
      source: nodes.find((n) => n.data.label === tokens[0]).id,
      target: nodes.find((n) => n.data.label === tokens[1]).id,
      type: 'transition',
      data: { label: 'event' },
    };

    setElements((es) => addEdge(edge, es));
    add(`States '${tokens[0]}' and ${tokens[1]} connected`);
  }

  const commands = [
    {
      key: 'add',
      group: 'machine',
      hint: '<name>,<x>,<y>',
      execute: createState,
    },
    {
      key: 'del',
      group: 'machine',
      hint: '<name> (delete state <name>)',
      execute: deleteState,
    },
    {
      key: 'link',
      group: 'machine',
      hint: '<source>,<target>',
      execute: connect,
    },
    {
      key: 'clear',
      group: 'canvas',
      hint: 'Remove everything',
      execute: () => {
        setElements([]);
        add('Canvas cleared');
      },
    },
    {
      key: 'zoom',
      group: 'canvas',
      hint: 'Zoom to fit',
      execute: () => fitView(),
    },
    {
      key: 'layout',
      group: 'canvas',
      hint: 'Magically layout the machine',
      execute: () => {
        const start = findStart(nodes, edges).data.label;
        const config = stringifyMachine(nodes, edges);
        const machine = configToMachine(start, store.orientation, config);
        if (!machine) return;
        setElements(machine);
        add('A machine magically appears');
      },
    },
    {
      key: 'copy',
      group: 'export',
      hint: 'Copy configuration to clipboard',
      execute: async () => {
        const config = stringifyMachine(nodes, edges);
        await navigator.clipboard.writeText(config);
        add('Configuration copied to clipboard');
      },
    },
    {
      key: 'png',
      group: 'export',
      hint: '<name> (exports as <name>.png)',
      execute: (name) => {
        createImage('my-canvas', name);
        add('Image created');
      },
    },
    {
      key: 'orientation',
      group: 'settings',
      hint: '<vertical|horizontal> (set preferred orientation)',
      execute: (v) => store.update('orientation', () => v),
    },
    {
      key: 'theme',
      group: 'settings',
      hint: '<dark|light> (set theme)',
      execute: (v) => store.update('theme', () => v),
    },
  ];

  return commands;
}
