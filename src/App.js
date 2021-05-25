import Canvas from 'components/canvas/Canvas';
import GithubCorner from 'components/GithubCorner';
import { ToastProvider } from 'components/Toast';
import Toolbar from 'components/toolbar/Toolbar';
import { createContext, useEffect, useRef, useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import packageJson from '../package.json';
import Sidebar from 'components/sidebar/Sidebar';
import useAppStore from 'hooks/useStore';

export const AppContext = createContext();

export default function App({ children }) {
  const theme = useAppStore('theme');
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('theme') !== theme)
      localStorage.setItem('theme', theme);
  }, [theme]);

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
    <div className="grail" data-theme={theme}>
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
            <footer>
              <span>{`v${packageJson.version} by `}</span>
              <a href="https://crinkle.dev">crinkle</a>
            </footer>
          </ReactFlowProvider>
        </ToastProvider>
      </AppContext.Provider>
    </div>
  );
}
