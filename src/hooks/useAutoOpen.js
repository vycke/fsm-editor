import { useEffect, useState } from 'react';

export default function useAutoOpen(cond) {
  const [state, setOpen] = useState(false);

  // Auto show/hide sidebar
  useEffect(() => {
    if (cond && !state) setOpen(true);
    if (!cond && state) setOpen(false);
  }, [cond, state]);

  function close() {
    setOpen(false);
  }

  return [state, close];
}
