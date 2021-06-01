import { Handle } from 'react-flow-renderer';

export default function StateNode({ data, selected, id, ...props }) {
  return (
    <div
      className="node | bg-blue text-0 text-gray-100 radius-1 py-000 px-0 border-solid border-w-2"
      data-selected={selected}>
      <div>{data.label}</div>
      <Handle
        type="source"
        position="left"
        id="left"
        style={{ left: '-3px' }}
      />
      <Handle type="source" position="top" id="top" style={{ top: '-3px' }} />
      <Handle
        type="source"
        position="right"
        id="right"
        style={{ right: '-3px' }}
      />
      <Handle
        type="source"
        position="bottom"
        id="bottom"
        style={{ bottom: '-3px' }}
      />
    </div>
  );
}
