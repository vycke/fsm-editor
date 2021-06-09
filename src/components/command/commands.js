import { configToMachine } from 'helpers/configToMachine';
import createImage from 'helpers/createImage';
import findStart from 'helpers/findStart';
import gId from 'helpers/generateId';
import { stringifyMachine } from 'helpers/machineToConfig';
import { store } from 'hooks/useStore';

const commands = [
  {
    key: 'add',
    group: 'machine',
    hint: 'Add a state on the [0, 0] position',
    execute: (_n, _e, set, instance) => {
      const position = { x: 0, y: 0 };
      const type = 'state';
      const node = { id: gId(), type, position, data: { label: 'state' } };
      set((es) => es.concat(node));
      setTimeout(() => instance.fitView(), 100);
    },
  },
  {
    key: 'clear',
    group: 'canvas',
    hint: 'Clear the canvas by removing everything',
    execute: (_n, _e, set) => set([]),
  },
  {
    key: 'zoom',
    group: 'canvas',
    hint: 'Zoom and center the machine',
    execute: (_n, _e, _s, instance) => instance.fitView(),
  },
  {
    key: 'layout',
    group: 'canvas',
    hint: 'Magically layout the machine',
    execute: (n, e, set, instance) => {
      const start = findStart(n, e)?.data?.label;
      if (!start) return;
      const config = stringifyMachine(n, e);
      const machine = configToMachine(start, store.orientation, config);
      if (!machine) return;
      set(machine);
      setTimeout(() => instance.fitView(), 100);
    },
  },
  {
    key: 'clipboard',
    group: 'export',
    hint: 'Copy configuration to clipboard',
    execute: async (n, e) => {
      const config = stringifyMachine(n, e);
      await navigator.clipboard.writeText(config);
    },
  },
  {
    key: 'png',
    group: 'export',
    hint: 'Export canvas to a .png image',
    execute: () => createImage('my-canvas'),
  },
  {
    key: 'dark theme',
    group: 'settings',
    hint: 'Enable the dark theme',
    execute: (v) => store.update('theme', () => 'dark'),
  },
  {
    key: 'light theme',
    group: 'settings',
    hint: 'Enable the light theme',
    execute: (v) => store.update('theme', () => 'light'),
  },
  {
    key: 'vertical',
    group: 'settings',
    hint: 'Set preferred layout orientation to vertical',
    execute: (v) => store.update('orientation', () => 'vertical'),
  },
  {
    key: 'horizontal',
    group: 'settings',
    hint: 'Set preferred layout orientation to horizontal',
    execute: (v) => store.update('orientation', () => 'horizontal'),
  },
];

export default commands;
