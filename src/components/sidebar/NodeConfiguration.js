import { useRef } from 'react';

export default function NodeConfiguration({ node, onUpdate }) {
  const inputRef = useRef();

  function handleUpdateName(e) {
    onUpdate(e.target.value, 'label', node.id);
  }

  return (
    <>
      <label className="text-00 text-gray-200 italic" htmlFor="name">
        Element name
      </label>
      <input
        ref={inputRef}
        id="name"
        onFocus={(e) => e.target.select()}
        value={node?.data?.label ?? ''}
        onChange={handleUpdateName}
        className="px-00 py-000 radius-1 border-gray-400 focus:border-blue border-w-2 no-outline full-width"
      />
    </>
  );
}
