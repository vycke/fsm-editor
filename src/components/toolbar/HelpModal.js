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
              settings on a state (displayed as dotted transitions)
            </li>
            <li>
              Add transitions by 'click-n-hold' on the handles of a state and
              move to another state
            </li>
            <li>Export the canvas as a .PNG</li>
            <li>
              Export the finite state machine configuration that can be used in
              many libraries (e.g.{' '}
              <a href="https://github.com/kevtiq/fsm"> my own library</a>, or{' '}
              <a href="https://github.com/davidkpiano/xstate">xstate</a>).{' '}
              <i>
                Note: the 'entry' and 'delay' settings do not comply with all
                libraries.
              </i>
            </li>
          </ul>

          <i className="mt-1 text-000">
            This editor is created and maintained by:{' '}
            <a href="https://crinkle.dev">crinkle.dev.</a> It is created to
            allow quick modeling of finite state machines for{' '}
            <a href="https://github.com/kevtiq/fsm"> my FSM library</a>.
          </i>
        </Modal>
      )}
    </>
  );
}
