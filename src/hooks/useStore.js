import { useReducer, useRef, useLayoutEffect } from 'react';
import { proxy } from '@crinkles/pubbel';

const initTheme = localStorage.getItem('theme') || 'light';
const initOrientation = localStorage.getItem('orientation') || 'vertical';
export const store = proxy(() => ({
  theme: initTheme,
  orientation: initOrientation,
}));

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
