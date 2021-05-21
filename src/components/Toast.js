import useFsm from 'hooks/useFsm';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const states = {
  visible: {
    on: {
      REMOVED: 'notvisible',
      CREATED: 'visible',
    },
    entry: (send) => {
      send('REMOVED', { delay: 6000 });
    },
  },
  notvisible: {
    on: {
      CREATED: 'visible',
    },
  },
};

export const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [label, setLabel] = useState('');
  const state = useFsm('notvisible', states);

  function add(v) {
    setLabel(v);
    state.send('CREATED');
  }

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      {createPortal(
        <div
          className="toast | shadow text-000 py-000 px-00 bg-blue text-gray-100 radius-2"
          data-state={state.current}>
          {label}
        </div>,
        document.querySelector('#toast')
      )}
    </ToastContext.Provider>
  );
}

export default function useToastManager() {
  return React.useContext(ToastContext);
}
