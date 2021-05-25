import Canvas from 'components/canvas/Canvas';
import GithubCorner from 'components/GithubCorner';
import { ToastProvider } from 'components/Toast';
import Toolbar from 'components/toolbar/Toolbar';
import { createContext, useRef, useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import packageJson from '../package.json';
import Sidebar from 'components/sidebar/Sidebar';

export const AppContext = createContext();

export default function App({ children }) {
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState([]);

  function updateElement(field, id) {
    return function (value) {
      setElements((es) =>
        es.map((e) => {
          if (e.id !== id) return e;
          e.data[field] = value.target.value;

          return e;
        })
      );
    };
  }

  return (
    <AppContext.Provider value={{ updateElement }}>
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
    </AppContext.Provider>
  );
}
