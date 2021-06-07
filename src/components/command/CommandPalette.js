import { AppContext } from 'App';
import useToastManager from 'components/Toast';
import useOutsideClick from 'hooks/useOutsideClick';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStoreState } from 'react-flow-renderer';
import { FiTerminal } from 'react-icons/fi';
import commands from './commands';

export default function CommandPalette() {
  const ref = useRef();
  const innerRef = useRef();
  const [show, setShow] = useState(false);
  const [command, setCommand] = useState('');
  const { add } = useToastManager();
  const { setElements, instance } = useContext(AppContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  // Add global listener to open the command paletttet
  useEffect(() => {
    const list = window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'p') setShow((s) => !s);
    });
  }, []);

  // On open, set focus on the input field
  useEffect(() => {
    if (show) innerRef.current.focus();
  }, [show]);

  // Ability to close the window with an outside click
  useOutsideClick(ref, show, close);

  // Filter all commands based on typed command
  const filtered = commands.filter((c) =>
    c.hint
      .toLocaleLowerCase()
      .includes(command.split(' ')[0].toLocaleLowerCase())
  );

  function close() {
    setShow('');
    setCommand('');
  }

  async function executeOnEnter(e) {
    if (!command || command === '') return;
    if (e.keyCode === 13) executeCommand(filtered[0]);
  }

  async function executeCommand(c) {
    if (!c) return;
    await c.execute(nodes, edges, setElements, instance);
    add('Command executed!');
    close();
  }

  return (
    <>
      <button
        className="text-0 hover:bg-gray-300 px-0 py-00 text-theme-front"
        onClick={() => setShow(true)}>
        <FiTerminal />
      </button>
      {show &&
        createPortal(
          <div
            id="modal"
            aria-modal={true}
            className="modal-screen"
            role="dialog"
            tabIndex="-1">
            <div
              className="modal-dialog | bg-gray-400 shadow flex-col radius-2 text-gray-100"
              ref={ref}>
              <div className="modal-body | radius-2">
                <input
                  className="monospace full-width no-outline bg-gray-400 border-gray-400 text-gray-100 p-0"
                  value={command}
                  ref={innerRef}
                  onKeyDown={executeOnEnter}
                  placeholder="Search for a command... "
                  onChange={(e) => setCommand(e.target.value)}
                />
                <div className="command-palette | flex-col">
                  {filtered.map((v) => (
                    <button
                      onClick={async () => await executeCommand(v)}
                      key={v.key}
                      className="split-left split-w-00 split-min-w-00 px-0 text-left hover:bg-gray-500 py-000">
                      <div>
                        <span className="text-000 monospace radius-0 px-000 bg-gray-300 text-gray-500">
                          {v.group}
                        </span>
                      </div>

                      <span className="text-00 text-gray-300 px-000">
                        {v.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.querySelector('#modal')
        )}
    </>
  );
}
