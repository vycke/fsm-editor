import { useCallback, useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import useToastManager from '../Toast';
import useAppStore, { store } from 'hooks/useStore';
import { configToMachine } from 'helpers/configToMachine';
import { AppContext } from 'App';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';
import { BiCodeCurly } from 'react-icons/bi';
import { FiClipboard, FiDownload } from 'react-icons/fi';
import Switch from 'components/Switch';
import { stringifyMachine } from 'helpers/machineToConfig';
import findStart from 'helpers/findStart';
import useModalTransition from 'hooks/useModalTransition';

export default function ImportModal() {
  const { visible, close, open, state } = useModalTransition();
  const { setElements } = useContext(AppContext);
  const orientation = useAppStore('orientation');
  const theme = useAppStore('theme');

  const { add } = useToastManager();
  const { fitView } = useZoomPanHelper();
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const [config, setConfig] = useState('');
  const [start, setStart] = useState('');

  const resetModal = useCallback(() => {
    if (nodes.length && edges.length) {
      setConfig(stringifyMachine(nodes, edges));
      setStart(findStart(nodes, edges)?.data?.label || '');
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (visible) resetModal();
  }, [visible, resetModal]);

  async function handleCopy() {
    await navigator.clipboard.writeText(config);
    add('Configuration copied to your clipboard!');
  }

  function handleSubmit() {
    const machine = configToMachine(start, orientation, config);

    if (!machine) {
      add('Not a valid configuration');
      return;
    }

    setElements(machine);
    close();
    add('Configuration imported!');
    setTimeout(() => fitView(), 250);
  }

  const codeColor = theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400';

  return (
    <>
      <button
        className="text-0 hover:bg-gray-300 px-0 py-00 text-theme-front"
        onClick={open}>
        <BiCodeCurly />
      </button>
      <Modal
        title="Import finite state machine configuration"
        onClose={close}
        state={state}
        visible={visible}>
        <div className="flex-row items-center mb-0">
          <span className="mr-0">Horizontal orientation:</span>
          <Switch
            checked={orientation === 'horizontal'}
            onClick={() =>
              store.update('orientation', (h) =>
                h === 'horizontal' ? 'vertical' : 'horizontal'
              )
            }
          />
        </div>

        <label className="text-00 text-gray-200 mb-000" htmlFor="name">
          Name of start state
        </label>
        <input
          id="name"
          placeholder="Element name"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="px-00 py-000 radius-1 border-gray-400 focus:border-blue border-w-2 no-outline full-width mb-0"
        />

        <span className="italic text-00">You can edit the below content!</span>
        <textarea
          rows={10}
          className={`${codeColor} p-1 pb-3 full-width text-gray-100 text-000 border-gray-400 focus:border-blue border-w-2 no-outline radius-1`}
          onChange={(e) => setConfig(e.target.value)}
          value={config || ''}
        />

        <button
          className="text-theme-front flex-row items-center hover:text-blue mt-00"
          onClick={handleCopy}>
          <FiClipboard />
          <span className="ml-00 flex-col align-start text-left italic">
            Copy the above configuration to your clipboard
          </span>
        </button>

        <button
          onClick={handleSubmit}
          className="mt-2 flex-row items-center justify-center px-00 py-000 text-00 text-gray-100 bg-blue hover:bg-blue-dark radius-1 full-width shadow transition">
          <FiDownload className="mr-00" />
          Import the above configuration
        </button>
      </Modal>
    </>
  );
}
