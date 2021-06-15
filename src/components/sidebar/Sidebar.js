import {
  removeElements,
  useStoreActions,
  useStoreState,
} from 'react-flow-renderer';
import { useContext, useEffect, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { AppContext } from 'App';
import useAutoOpen from 'hooks/useAutoOpen';

const DEFAULT_ACTION = 'NO_ENTRY_ACTION';

export default function Sidebar() {
  const { updateElement, setElements } = useContext(AppContext);
  const setSelected = useStoreActions((actions) => actions.setSelectedElements);
  // State management
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
  const [state, close] = useAutoOpen(selected);

  // auto focus
  useEffect(() => {
    if (selected?.id) inputRef.current.focus();
  }, [selected?.id]);

  // Conditionals
  const isEdge = selected?.source ? true : false;

  // handlers
  function handleDelete() {
    setElements((els) => removeElements([selected], els));
    setSelected([]);
    close();
  }

  function setEntryAction(v) {
    if (v?.target?.value === DEFAULT_ACTION)
      updateElement('entry', selected?.id)({ target: { value: null } });
    else updateElement('entry', selected?.id)(v);

    if (isEdge) return;

    // Set animation on auto-transition
    const edgeIds = edges.map((e) => e.id);

    setElements((els) => {
      return els.map((e) => {
        if (!edgeIds.includes(e.id)) return e;
        if (e.data.label === v.target.value) return { ...e, animated: true };
        return { ...e, animated: false };
      });
    });
  }

  return (
    <aside
      className="sidebar | bg-theme-back-secondary flex-col items-start py-1 px-0 text-theme-front shadow"
      data-opened={state}>
      <h2 className="text-1 mb-0">Element settings</h2>
      <label className="text-00 text-theme-front mb-000" htmlFor="name">
        Element name
      </label>
      <input
        ref={inputRef}
        id="name"
        placeholder="Element name"
        onFocus={(e) => e.target.select()}
        value={selected?.data?.label ?? ''}
        onChange={updateElement('label', selected?.id)}
        className="px-00 py-000 radius-000 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
      />

      {!isEdge && edges?.length > 0 && (
        <>
          <label
            className="text-00 text-theme-front mt-0 mb-000"
            htmlFor="entry">
            State entry action
          </label>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            onChange={setEntryAction}
            id="entry"
            value={selected?.data?.entry ?? 'default'}
            className="px-00 py-00 radius-000 border-gray-400 focus:border-blue border-w-2 no-outline full-width">
            <option value={DEFAULT_ACTION}>---</option>
            {edges?.map((e, i) => (
              <option key={i} value={e.data.label}>
                {e.data.label}
              </option>
            ))}
          </select>
        </>
      )}

      {!isEdge && selected?.data?.entry && (
        <>
          <label
            className="mt-0 text-00 text-theme-front mb-000"
            htmlFor="delay">
            State entry delay
          </label>
          <input
            id="delay"
            placeholder="e.g. 3000"
            value={selected?.data?.delay ?? ''}
            onChange={updateElement('delay', selected?.id)}
            className="px-00 py-000 radius-000 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
          />
        </>
      )}

      {isEdge && (
        <>
          <label
            className="mt-0 text-00 text-theme-front mb-000"
            htmlFor="guard">
            Transition guard function (e.g. <code>(ctx) => ctx.isAllowed</code>)
          </label>
          <input
            id="guard"
            placeholder="e.g.(ctx) => ctx.isAllowed"
            value={selected?.data?.guard ?? ''}
            onChange={updateElement('guard', selected?.id)}
            className="px-00 py-000 radius-000 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
          />
        </>
      )}

      <button
        onClick={handleDelete}
        className="flex-row items-center justify-center px-00 py-000 text-00 text-gray-100 bg-red hover:bg-red-dark radius-000 full-width shadow transition">
        <FiTrash2 className="mr-00" />
        Delete element
      </button>
    </aside>
  );
}
