import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';

const OPTIONS = ['send', 'assign', 'custom'];

export default function ActionList({
  actions = [],
  onChange,
  onAdd,
  className = '',
  onRemove,
  title,
}) {
  return (
    <div className={`flex-col w-full ${className}`}>
      <span
        className="mb-00"
        data-tooltip="'send' and 'assign' are available default actions">
        {title} *
      </span>
      {actions.map((a, i) => (
        <div key={i} className="flex-row items-center flex-g-00 w-full">
          <input
            id="guard"
            placeholder="(s, ctx) => send('GO', ctx, 3000)"
            value={a || ''}
            onChange={(v) => onChange(i, v.target.value)}
            className="px-00 py-000 radius-000 border-gray-400 focus:border-blue border-w-1 no-outline flex-grow"
          />
          <button onClick={() => onRemove(i)}>
            <FiTrash2 />
          </button>
        </div>
      ))}
      <button onClick={onAdd} className="mt-0 text-0">
        <FiPlusCircle />
      </button>
    </div>
  );
}
