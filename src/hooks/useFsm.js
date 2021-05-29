import { fsm } from '@crinkles/fsm';
import { useLayoutEffect, useReducer, useRef } from 'react';

// Define the hook, with query for computed parameters
export default function useFsm(initial, config) {
  const [, rerender] = useReducer((c) => c + 1, 0);
  const value = useRef(fsm(initial, config));

  useLayoutEffect(() => {
    value.current.listen(rerender);
  }, []); //eslint-disable-line

  return value.current;
}
