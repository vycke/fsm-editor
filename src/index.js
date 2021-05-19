import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Canvas from './components/Canvas';
import { ToastProvider } from 'components/Toast';

const init = [
  {
    id: '1',
    type: 'state', // input node
    data: { label: 'Start' },
    position: { x: 250, y: 250 },
  },
];

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Canvas init={init} />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
