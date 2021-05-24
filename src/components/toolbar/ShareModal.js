import { cloneElement, useState } from 'react';
import Modal from '../Modal';
import { FiClipboard } from 'react-icons/fi';
import { useStoreState } from 'react-flow-renderer';
import useToastManager from '../Toast';
import { machineToBase64 } from 'helpers/conversion';

export default function ShareModal({ children }) {
  const [show, setShow] = useState(false);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const { add } = useToastManager();

  async function handleCopy() {
    const compressed = machineToBase64(nodes, edges);
    const link = `${window.location.origin}/?code=${compressed}`;

    await navigator.clipboard.writeText(link);
    add('Link copied to your clipboard!');
  }

  return (
    <>
      {cloneElement(children, { onClick: () => setShow(!show), active: show })}
      {show && (
        <Modal title="Share your state machine" onClose={() => setShow(false)}>
          <div className="italic text-000 mb-0">
            With every change in your diagram, the link changes, all data
            resides on your computer only
          </div>
          <button
            className="text-gray-100 flex-row items-center"
            onClick={handleCopy}>
            <FiClipboard />
            <span className="italic ml-00">Copy URL: url link here</span>
          </button>
        </Modal>
      )}
    </>
  );
}
