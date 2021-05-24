import { removeElements, useStoreState } from 'react-flow-renderer';
import useFsm from 'hooks/useFsm';
import { useEffect, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const states = {
  opened: { on: { CHANGE: 'closed' } },
  closed: { on: { CHANGE: 'opened' } },
};

export default function Sidebar({ onRemoveElement, setElements }) {
  // State management
  const state = useFsm('closed', states);
  const inputRef = useRef();
  const selected = useStoreState((store) => {
    const el = store.selectedElements?.[0];
    if (el?.source) return store.edges.find((e) => e.id === el.id);
    return el;
  });
  const edges = useStoreState((store) => {
    const el = store.selectedElements?.[0];
    return store.edges.filter((e) => e.source === el?.id);
  });

  function handleDelete() {
    setElements((els) => removeElements([selected], els));
    state.send('CHANGE');
  }

  // Auto show/hide sidebar
  useEffect(() => {
    if (selected && state.current === 'closed') state.send('CHANGE');
    if (!selected && state.current === 'opened') state.send('CHANGE');
  }, [selected, state]);

  // auto focus
  useEffect(() => {
    if (selected?.id) inputRef.current.focus();
  }, [selected?.id]);

  // Conditionals
  const isEdge = selected?.source ? true : false;

  // update function
  function handleUpdate(field) {
    return function (value) {
      setElements((es) =>
        es.map((e) => {
          if (e.id !== selected?.id) return e;
          e.data[field] = value.target.value;

          return e;
        })
      );
    };
  }

  return (
    <aside
      className="sidebar | flex-col items-start py-1 px-0 bg-gray-500 text-gray-100"
      data-state={state.current}>
      <h2 className="text-1 mb-0">Element settings</h2>
      <label className="text-00 text-gray-200 italic mb-000" htmlFor="name">
        Element name
      </label>
      <input
        ref={inputRef}
        id="name"
        onFocus={(e) => e.target.select()}
        value={selected?.data?.label ?? ''}
        onChange={handleUpdate('label')}
        className="px-00 py-000 radius-1 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
      />

      {!isEdge && edges?.length > 0 && (
        <>
          <label
            className="text-00 text-gray-200 italic mt-2 mb-000"
            htmlFor="entry">
            Select transition that should fire on entry of the state
          </label>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            onChange={handleUpdate('entry')}
            id="enty"
            value={selected?.data?.entry ?? 'default'}
            className="px-00 py-00 radius-1 border-gray-400 focus:border-blue border-w-2 no-outline full-width">
            <option value="default" disabled>
              ---
            </option>
            {edges?.map((e, i) => (
              <option key={i} value={e.label}>
                {e.label}
              </option>
            ))}
          </select>
        </>
      )}

      {!isEdge && selected?.data?.entry && (
        <>
          <label
            className="mt-2 text-00 text-gray-200 italic mb-000"
            htmlFor="delay">
            Set delay for auto-transition on entry of state
          </label>
          <input
            id="delay"
            value={selected?.data?.delay ?? '0'}
            onChange={handleUpdate('delay')}
            className="px-00 py-000 radius-1 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
          />
        </>
      )}

      {isEdge && (
        <>
          <label
            className="mt-2 text-00 text-gray-200 italic mb-000"
            htmlFor="guard">
            Set guard condition for this transition based on the{' '}
            <code>ctx</code> object (e.g. <code>ctx.isAllowed</code>)
          </label>
          <input
            id="guard"
            value={selected?.data?.guard ?? ''}
            onChange={handleUpdate('guard')}
            className="px-00 py-000 radius-1 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
          />
        </>
      )}

      <button
        onClick={handleDelete}
        className="flex-row items-center justify-center px-00 py-000 text-00 text-gray-100 bg-red hover:bg-red-dark radius-1 full-width shadow transition">
        <FiTrash2 className="mr-00" />
        Delete element
      </button>
    </aside>
  );
}
