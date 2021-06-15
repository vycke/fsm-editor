import { AppContext } from 'App';
import useToastManager from 'components/Toast';
import useModalTransition from 'hooks/useModalTransition';
import useOutsideClick from 'hooks/useOutsideClick';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStoreState } from 'react-flow-renderer';
import { FiTerminal } from 'react-icons/fi';
import Command from './Command';
import commands from './commands';

export default function CommandPalette() {
  const ref = useRef();
  const innerRef = useRef();
  const { visible, close, open, state, change } = useModalTransition();
  const [command, setCommand] = useState('');
  const { add } = useToastManager();
  const { setElements, instance } = useContext(AppContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  // Add global listener to open the command paletttet
  useEffect(() => {
    const list = window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'p') change();
    });
  }, []); //eslint-disable-line

  // On open, set focus on the input field
  useEffect(() => {
    if (visible) innerRef.current.focus();
  }, [visible]);

  // Ability to close the window with an outside click
  useOutsideClick(ref, visible, close);

  // Filter all commands based on typed command
  const filtered = commands.filter((c) =>
    c.hint
      .toLocaleLowerCase()
      .includes(command.split(' ')[0].toLocaleLowerCase())
  );

  function handleClose() {
    close();
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
        onClick={open}>
        <FiTerminal />
      </button>
      {visible &&
        createPortal(
          <div
            id="modal"
            aria-modal={true}
            className="modal-screen"
            role="dialog"
            tabIndex="-1">
            <div
              data-state={state}
              className="modal-dialog | bg-gray-400 shadow flex-col radius-00 text-gray-100"
              ref={ref}>
              <div className="modal-body | radius-00">
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
                    <Command
                      key={v.key}
                      search={command}
                      command={v}
                      execute={executeCommand}
                    />
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
