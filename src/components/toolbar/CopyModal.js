import { cloneElement, useState } from 'react';
import Modal from '../Modal';
import { FiClipboard } from 'react-icons/fi';
import { useStoreState } from 'react-flow-renderer';
import useToastManager from '../Toast';
import { stringifyMachine } from 'helpers/machineToConfig';
import useAppStore from 'hooks/useStore';

export default function ClipboardModal({ children }) {
  const theme = useAppStore('theme');
  const [show, setShow] = useState(false);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const { add } = useToastManager();

  const configuration = stringifyMachine(nodes, edges);

  async function handleCopy() {
    await navigator.clipboard.writeText(configuration);
    add('Configuration copied to your clipboard!');
  }

  const codeColor = theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400';

  return (
    <>
      {cloneElement(children, { onClick: () => setShow(!show), active: show })}
      {show && (
        <Modal
          title="Finite state machine configuration"
          onClose={() => setShow(false)}
          show={show}>
          <button
            className="text-gray-100 flex-row items-center"
            onClick={handleCopy}>
            <FiClipboard />
            <div className="ml-00 flex-col align-start text-left">
              <span className="italic">
                Copy configuration* to your clipboard
              </span>
              <span className="italic text-000">
                * Make sure you use unique state and transition names
              </span>
            </div>
          </button>

          <pre className={`${codeColor} p-000 full-width`}>
            <code>{configuration}</code>
          </pre>
        </Modal>
      )}
    </>
  );
}
