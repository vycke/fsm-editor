import {
  removeElements,
  useStoreActions,
  useStoreState,
} from 'react-flow-renderer';
import { useContext, useEffect, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { AppContext } from 'App';
import useAutoOpen from 'hooks/useAutoOpen';
import ActionList from './ActionList';

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

  // Add action to list
  function addAction(type) {
    updateElement(type, selected?.id)([...(selected?.data?._entry || []), '']);
  }

  // Remove action from a list based on index
  function removeAction(index, type) {
    const _actions = selected?.data?.[type] || [];
    _actions.splice(index, 1);
    updateElement(type, selected?.id)(_actions);
  }

  // update action based on index & input
  function updateAction(index, value, type) {
    const _actions = selected?.data?.[type] || [];
    _actions[index] = value;
    updateElement(type, selected?.id)(_actions);
  }

  return (
    <aside
      className="sidebar | bg-back-secondary flex-col items-start py-1 px-0 text-front shadow"
      data-opened={state}>
      <h2 className="text-1 mb-0">Element settings</h2>
      <label className="text-00 text-front mb-000" htmlFor="name">
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

      {!isEdge && (
        <ActionList
          title="Entry actions"
          className="mt-0"
          actions={selected?.data?._entry}
          onAdd={() => addAction('_entry')}
          onRemove={(i) => removeAction(i, '_entry')}
          onChange={(i, value) => updateAction(i, value, '_entry')}
        />
      )}
      {!isEdge && (
        <ActionList
          title="Exit actions"
          className="mt-0"
          actions={selected?.data?._exit}
          onAdd={() => addAction('_exit')}
          onRemove={(i) => removeAction(i, '_exit')}
          onChange={(i, value) => updateAction(i, value, '_entry')}
        />
      )}

      {isEdge && (
        <>
          <label className="mt-0 text-00 text-front mb-000" htmlFor="guard">
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
      {isEdge && (
        <ActionList
          title="Actions"
          className="mt-0"
          actions={selected?.data?.actions}
          onAdd={() => addAction('actions')}
          onRemove={(i) => removeAction(i, 'actions')}
          onChange={(i, value) => updateAction(i, value, 'actions')}
        />
      )}

      <button
        data-type="delete"
        onClick={handleDelete}
        className="flex-row items-center justify-center px-00 py-000 text-00 text-gray-100 bg-red hover:bg-red-dark radius-000 full-width shadow -200">
        <FiTrash2 className="mr-00" />
        Delete element
      </button>
    </aside>
  );
}
