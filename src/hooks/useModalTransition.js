import { send } from '@crinkles/fsm';
import useFsm from './useFsm';

const config = {
  appearing: {
    FINISHED: 'visible',
    _entry: [() => send('FINISHED', null, 50)],
  },
  visible: {
    CLOSE: 'dissapearing',
  },
  dissapearing: {
    FINISHED: 'removed',
    _entry: [() => send('FINISHED', null, 500)],
  },
  removed: {
    OPEN: 'appearing',
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
