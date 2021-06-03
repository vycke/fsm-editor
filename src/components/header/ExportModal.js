import { useState } from 'react';
import Modal from '../Modal';
import { useStoreState } from 'react-flow-renderer';
import useToastManager from '../Toast';
import { stringifyMachine } from 'helpers/machineToConfig';
import useAppStore from 'hooks/useStore';
import { FiDownload, FiImage, FiClipboard } from 'react-icons/fi';
import useCreateImage from 'hooks/useCreateImage';

export default function ExportModal() {
  const theme = useAppStore('theme');
  const [show, setShow] = useState(false);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const downloadImage = useCreateImage('my-canvas');
  const { add } = useToastManager();

  const configuration = stringifyMachine(nodes, edges);

  async function handleCopy() {
    await navigator.clipboard.writeText(configuration);
    add('Configuration copied to your clipboard!');
  }

  const codeColor = theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400';

  return (
    <>
      <button
        className="text-0 hover:bg-gray-300 px-0 py-00 text-theme-front"
        onClick={() => setShow(true)}>
        <FiDownload />
      </button>
      {show && (
        <Modal title="Export" onClose={() => setShow(false)} show={show}>
          <button
            onClick={downloadImage}
            className="flex-row items-center justify-center px-00 py-000 text-00 text-gray-100 bg-blue hover:bg-blue-dark radius-1 full-width shadow transition mb-0">
            <FiImage className="mr-00" />
            Download image (.png)
          </button>

          <pre className={`${codeColor} text-gray-100 p-000 full-width`}>
            <code>{configuration}</code>
          </pre>

          <button
            className="text-gray-100 flex-row items-center hover:text-blue mt-00"
            onClick={handleCopy}>
            <FiClipboard />
            <span className="ml-00 flex-col align-start text-left italic">
              Copy the above configuration to your clipboard
            </span>
          </button>
        </Modal>
      )}
    </>
  );
}
