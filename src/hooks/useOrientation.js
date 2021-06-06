import { useEffect } from 'react';
import useAppStore from './useStore';

export default function useOrientation() {
  const theme = useAppStore('orientation');

  useEffect(() => {
    if (localStorage.getItem('orientation') !== theme)
      localStorage.setItem('orientation', theme);
  }, [theme]);

  return theme;
}
