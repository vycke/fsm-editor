import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Canvas from './components/Canvas';
import { ToastProvider } from 'components/Toast';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Canvas />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
