import { useReducer, useRef, useLayoutEffect } from 'react';
import { proxy } from '@crinkle/pubbel';

const init = localStorage.getItem('theme') || 'light';
export const store = proxy(() => ({ theme: init }));

export default function useAppStore(key) {
  const [, rerender] = useReducer((c) => c + 1, 0);
  const value = useRef(store[key]);

  useLayoutEffect(() => {
    function updateCachedValue(s) {
      value.current = s;
      rerender();
    }

    store.on(key, updateCachedValue);
    return () => store.off(key, updateCachedValue);
  }, []); //eslint-disable-line

  return value.current;
}
