import { useEffect } from 'react';
import useAppStore from './useStore';

export default function useTheme() {
  const theme = useAppStore('theme');

  useEffect(() => {
    if (localStorage.getItem('theme') !== theme)
      localStorage.setItem('theme', theme);
  }, [theme]);

  return theme;
}
