import Modal from '../Modal';
import { FiHelpCircle } from 'react-icons/fi';
import useModalTransition from 'hooks/useModalTransition';

export default function HelpModal() {
  const { visible, close, open, state } = useModalTransition();

  return (
    <>
      <button
        className="text-0 hover:bg-gray-300 px-0 py-00 text-theme-front"
        onClick={open}>
        <FiHelpCircle />
      </button>

      <Modal title="Help" onClose={close} state={state} visible={visible}>
        <p>
          The editor allows minimal features around creating state machines:
        </p>
        <ul>
          <li>
            Add states by 'drag-n-drop' the '+' icon in the bottom toolbar on
            the canvas
          </li>
          <li>
            Add transitions by 'click-n-hold' on the handles of a state and move
            to another state
          </li>
          <li>
            Configure automated transitions by setting the 'entry' and 'delay'
            settings on a state (dotted transitions)
          </li>
          <li>
            Add guard conditions to transition (based on a <code>.ctx</code>{' '}
            object)
          </li>
          <li>Export the canvas as a .PNG</li>
          <li>
            Magically create a layout based on the{' '}
            <a href="https://github.com/crinklesio/digl"> DIGL engine</a>
          </li>
          <li>
            Set a preferred orientation in the settings for the layout engine
          </li>
          <li>
            Light and dark-mode (note: dark-mode impacts the background color of
            the .PNG export)
          </li>
          <li>
            Export the finite state machine configuration, useable for{' '}
            <a href="https://github.com/crinklesio/fsm"> this fsm library</a>,
            or <a href="https://github.com/davidkpiano/xstate">xstate *</a>).{' '}
          </li>
          <li>
            Import said configuration and the editor will create a machine for
            you (with the ability to alter the configuration before importing)
          </li>
          <li>
            Open/cose the command palette via <code>ctrl + p</code>
          </li>
        </ul>

        <i className="mt-1 text-000">
          * The 'entry' and 'delay' settings do not comply with all libraries.
        </i>
      </Modal>
    </>
  );
}
