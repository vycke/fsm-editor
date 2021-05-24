import Canvas from 'components/canvas/Canvas';
import GithubCorner from 'components/GithubCorner';
import { ToastProvider } from 'components/Toast';
import Toolbar from 'components/toolbar/Toolbar';
import { useRef, useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import packageJson from '../package.json';
import Sidebar from 'components/sidebar/Sidebar';
import { base64ToMachine } from 'helpers/conversion';

export default function App({ children }) {
  const config = base64ToMachine(window.location.pathname.replace('/', ''));

  console.log(config);

  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState([]);

  return (
    <ToastProvider>
      <GithubCorner />
      <ReactFlowProvider>
        <main className="reactflow-wrapper" ref={reactFlowWrapper}>
          <Canvas
            wrapper={reactFlowWrapper}
            elements={elements}
            setElements={setElements}
          />
          <Toolbar />
        </main>
        <Sidebar setElements={setElements} />
        <footer className="text-000">
          <span>{`v${packageJson.version} by `}</span>
          <a href="https://crinkle.dev">crinkle</a>
        </footer>
      </ReactFlowProvider>
    </ToastProvider>
  );
}
