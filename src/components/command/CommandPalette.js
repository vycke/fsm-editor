import useToastManager from 'components/Toast';
import useOutsideClick from 'hooks/useOutsideClick';
import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiTerminal } from 'react-icons/fi';
import useCommands from './useCommands';

export default function CommandPalette() {
  const ref = useRef();
  const innerRef = useRef();
  const [show, setShow] = useState(false);
  const [command, setCommand] = useState('');
  const commands = useCommands();
  const { add } = useToastManager();

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

  // Function to actually execute the command, on enter
  async function execute(e) {
    if (e.keyCode !== 13) return;

    const tokens = command.split(' ');
    const _command = commands.find((c) => c.key === tokens[0].replace('/', ''));
    if (!_command) {
      add('Not a valid command');
      return;
    }

    await _command.execute(tokens[1]);

    setCommand('');
  }

  // Ability to close the window with an outside click
  useOutsideClick(ref, show, () => {
    setShow('');
    setCommand('');
  });

  // Filter and group all commands based on typed command
  const filtered = commands.filter((c) =>
    c.key.includes(command.split(' ')[0].replace('/', ''))
  );

  const grouped = {};
  filtered.forEach((f) => {
    if (grouped[f.group]) grouped[f.group].push(f);
    else grouped[f.group] = [f];
  });

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
              className="modal-dialog | bg-gray-400 shadow border-gray-400 flex-col radius-2 text-gray-100"
              ref={ref}>
              <div className="modal-body | radius-2 pb-0">
                <input
                  className="monospace full-width no-outline bg-gray-400 border-gray-400 text-gray-100 p-0"
                  value={command}
                  ref={innerRef}
                  onKeyDown={execute}
                  placeholder="Type your command here... (start with /)"
                  onChange={(e) => setCommand(e.target.value)}
                />
                <div className="command-palette | flex-col flow-y flow-g-000">
                  {Object.entries(grouped).map(([key, value]) => (
                    <Fragment key={key}>
                      <span className="bg-gray-500 text-gray-300 px-0 italic text-00">
                        {key}
                      </span>
                      {value.map((v) => (
                        <div
                          key={v.key}
                          className="split-left split-w-00 split-min-w-00 px-0">
                          <div>
                            <span className="text-000 monospace radius-0 px-000 bg-gray-300 text-gray-500">
                              {`/${v.key}`}
                            </span>
                          </div>

                          <span className="text-00 text-gray-300 px-000">
                            {v.hint}
                          </span>
                        </div>
                      ))}
                    </Fragment>
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
