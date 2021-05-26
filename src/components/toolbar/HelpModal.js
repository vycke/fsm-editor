import { cloneElement, useState } from 'react';
import Modal from '../Modal';

export default function HelpModal({ children }) {
  const [show, setShow] = useState(false);

  return (
    <>
      {cloneElement(children, { onClick: () => setShow(!show), active: show })}
      {show && (
        <Modal title="Help" onClose={() => setShow(false)} show={show}>
          <p>
            The editor allows minimal features around creating state machines:
          </p>
          <ul>
            <li>
              Add states by 'drag-n-drop' the '+' icon in the bottom toolbar on
              the canvas
            </li>
            <li>
              Configure automated transitions by setting the 'entry' and 'delay'
              settings on a state
            </li>
            <li>
              Add transitions by 'click-n-hold' on the handles of a state and
              move to another state
            </li>
            <li>
              Add guard conditions to transition (based on a <code>.ctx</code>{' '}
              object)
            </li>
            <li>Export the canvas as a .PNG</li>
            <li>
              Export the finite state machine configuration, useable for{' '}
              <a href="https://github.com/kevtiq/fsm"> this fsm library</a>, or{' '}
              <a href="https://github.com/davidkpiano/xstate">xstate *</a>).{' '}
            </li>
            <li>
              Light and dark-mode (note: dark-mode impacts the background color
              of the .PNG export)
            </li>
          </ul>

          <i className="mt-1 text-000">
            * The 'entry' and 'delay' settings do not comply with all libraries.
          </i>
        </Modal>
      )}
    </>
  );
}
