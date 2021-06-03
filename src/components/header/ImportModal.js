import { useContext, useRef, useState } from 'react';
import Modal from '../Modal';
import useToastManager from '../Toast';
import useAppStore from 'hooks/useStore';
import { configToMachine } from 'helpers/configToMachine';
import { AppContext } from 'App';
import { useZoomPanHelper } from 'react-flow-renderer';
import { FiUpload } from 'react-icons/fi';
import Switch from 'components/Switch';

export default function ImportModal() {
  const ref = useRef();
  const { setElements } = useContext(AppContext);
  const theme = useAppStore('theme');
  const [show, setShow] = useState(false);
  const [start, setStart] = useState('');
  const [horizontal, setHorizontal] = useState(true);
  const { add } = useToastManager();
  const { fitView } = useZoomPanHelper();

  const codeColor = theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400';

  function changeShow() {
    setStart('');
    setShow(!show);
  }

  function handleSubmit() {
    const machine = configToMachine(
      start,
      horizontal ? 'horizontal' : 'vertical',
      ref.current.innerText
    );

    if (!machine) {
      add('Not a valid configuration');
      return;
    }

    setElements(machine);
    changeShow();
    fitView();
    add('Configuration imported!');
  }

  return (
    <>
      <button
        className="text-0 hover:bg-gray-300 px-0 py-00 text-theme-front"
        onClick={() => setShow(true)}>
        <FiUpload />
      </button>
      {show && (
        <Modal
          title="Import finite state machine configuration"
          onClose={changeShow}
          show={show}>
          <div className="flex-row items-center mb-0">
            <span className="mr-0">Horizontal orientation:</span>
            <Switch
              checked={horizontal}
              onClick={() => setHorizontal(!horizontal)}
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

          <span className="italic text-00">Paste content in the box below</span>
          <pre className={`${codeColor} p-1 pb-3 full-width`}>
            <code
              className="full-width pb-0 text-gray-100"
              contentEditable={true}
              ref={ref}
              html={'Paste configuration here'}
            />
          </pre>

          <button
            onClick={handleSubmit}
            className="mt-2 flex-row items-center justify-center px-00 py-000 text-00 text-gray-100 bg-blue hover:bg-blue-dark radius-1 full-width shadow transition">
            <FiUpload className="mr-00" />
            Import configuration
          </button>
        </Modal>
      )}
    </>
  );
}
