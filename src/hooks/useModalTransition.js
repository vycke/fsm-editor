import { send } from '@crinkles/fsm';
import useFsm from './useFsm';

const config = {
  appearing: {
    on: { FINISHED: 'visible' },
    entry: send('FINISHED', 50),
  },
  visible: {
    on: { CLOSE: 'dissapearing' },
  },
  dissapearing: {
    on: { FINISHED: 'removed' },
    entry: send('FINISHED', 500),
  },
  removed: {
    on: { OPEN: 'appearing' },
  },
};

export default function useModalTransition() {
  const state = useFsm('removed', config);

  const visible = state.current !== 'removed';

  function close() {
    state.send('CLOSE');
  }

  function open() {
    state.send('OPEN');
  }

  function change() {
    if (state.current !== 'removed') state.send('CLOSE');
    else state.send('OPEN');
  }

  return { visible, open, close, state: state.current, change };
}
