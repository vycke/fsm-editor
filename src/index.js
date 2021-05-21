import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Canvas from './components/Canvas';
import { ToastProvider } from 'components/Toast';
import GithubCorner from 'components/GithubCorner';
import packageJson from '../package.json';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <GithubCorner />
      <Canvas />
      <footer className="text-000">
        <span>{`v${packageJson.version} by `}</span>
        <a href="https://crinkle.dev">crinkle</a>
      </footer>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
