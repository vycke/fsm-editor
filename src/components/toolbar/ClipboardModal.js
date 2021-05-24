import { cloneElement, useState } from 'react';
import Modal from '../Modal';
import { FiClipboard } from 'react-icons/fi';
import { useStoreState } from 'react-flow-renderer';
import useToastManager from '../Toast';
import { stringifyMachine } from 'helpers/conversion';

export default function ClipboardModal({ children }) {
  const [show, setShow] = useState(false);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const { add } = useToastManager();

  const configuration = stringifyMachine(nodes, edges);

  async function handleCopy() {
    await navigator.clipboard.writeText(configuration);
    add('Configuration copied to your clipboard!');
  }

  return (
    <>
      {cloneElement(children, { onClick: () => setShow(!show), active: show })}
      {show && (
        <Modal
          title="Finite state machine configuration"
          onClose={() => setShow(false)}>
          <button
            className="text-gray-100 flex-row items-center"
            onClick={handleCopy}>
            <FiClipboard />
            <span className="italic ml-00">Copy configuration</span>{' '}
          </button>
          <pre className="bg-gray-400 p-000 full-width">
            <code>{configuration}</code>
          </pre>
        </Modal>
      )}
    </>
  );
}
