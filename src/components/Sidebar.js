import packageJson from '../../package.json';
import { useStoreState } from 'react-flow-renderer';
import useFsm from 'hooks/useFsm';
import stateToCode from 'helpers/stateToCode';
import { FiClipboard } from 'react-icons/fi';
import useToastManager from './Toast';

const states = {
  open: { on: { CHANGE: 'closed' } },
  closed: { on: { CHANGE: 'open' } },
};

export default function Sidebar({ onUpdateElement }) {
  const state = useFsm('closed', states);
  const { add } = useToastManager();
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const selected = useStoreState((store) => {
    const el = store.selectedElements?.[0];
    if (el?.source) return edges.find((e) => e.id === el.id);
    return el;
  });
  const type = selected?.source ? 'Edge' : 'Node';

  function handleUpdate(v) {
    if (!selected) return;
    onUpdateElement(v.target.value, selected.id, type === 'Edge');
  }

  const code = stateToCode(nodes, edges);

  async function handleCopy() {
    await navigator.clipboard.writeText(JSON.stringify(code, null, 2));
    add('Configuration copied to your clipboard!');
  }

  return (
    <aside className="sidebar | flex-row" data-state={state.current}>
      <button
        className="bg-gray-200 px-000 text-blue text-1"
        onClick={() => state.send('CHANGE')}>
        <div>›</div>
      </button>
      <div className="flex-col items-start p-0 bg-gray-500 text-gray-100">
        {selected && (
          <>
            <h2 className="text-1 mb-0">{`${type} settings`}</h2>
            <label className="text-00 text-gray-200 italic">{`${type} name:`}</label>
            <input
              value={type === 'Edge' ? selected.label : selected.data.label}
              onChange={handleUpdate}
              className="mb-3 px-00 py-000 radius-1 border-gray-300 focus:border-blue border-w-2 no-outline"
            />
          </>
        )}

        <details className="full-width">
          <summary className="text-1 mb-0">State machine configuration</summary>
          <button
            className="text-gray-100 flex-row items-center"
            onClick={handleCopy}>
            <FiClipboard />
            <span className="italic ml-00">Copy configuration</span>{' '}
          </button>
          <pre className="bg-gray-400 p-000 full-width">
            <code>{JSON.stringify(code, null, 2)}</code>
          </pre>
        </details>

        {/* <h2 className="text-1 mb-0">State machine configuration</h2> */}

        <footer className="self-end py-000 px-0 text-000 text-gray-200">
          Version {packageJson.version}{' '}
          <a
            href="https://github.com/kevtiq/fsm-editor"
            title="Link to the open source GitHub page">
            GitHub
          </a>
        </footer>
      </div>
    </aside>
  );
}
