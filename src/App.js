import Canvas from 'components/canvas/Canvas';
import GithubCorner from 'components/GithubCorner';
import { ToastProvider } from 'components/Toast';
import Toolbar from 'components/toolbar/Toolbar';
import { createContext, useEffect, useRef, useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import packageJson from '../package.json';
import Sidebar from 'components/sidebar/Sidebar';
import useTheme from 'hooks/useTheme';

const initial = JSON.parse(localStorage.getItem('elements')) || [];

export const AppContext = createContext();

export default function App({ children }) {
  const theme = useTheme();
  const [instance, setInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState(initial);

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

  useEffect(() => {
    if (!instance) return;
    localStorage.setItem(
      'elements',
      JSON.stringify(instance.toObject().elements)
    );
  }, [elements, instance]);

  return (
    <div className="grail" data-theme={theme}>
      <AppContext.Provider value={{ updateElement, instance, setElements }}>
        <ToastProvider>
          <GithubCorner />
          <ReactFlowProvider>
            <main className="reactflow-wrapper" ref={reactFlowWrapper}>
              <Canvas
                wrapper={reactFlowWrapper}
                elements={elements}
                setElements={setElements}
                onLoad={setInstance}
                instance={instance}
              />
              <Toolbar setElements={setElements} />
            </main>
            <Sidebar setElements={setElements} />
            <footer>
              <span>{`v${packageJson.version} by `}</span>
              <a href="https://crinkles.io">crinkles</a>
            </footer>
          </ReactFlowProvider>
        </ToastProvider>
      </AppContext.Provider>
    </div>
  );
}
