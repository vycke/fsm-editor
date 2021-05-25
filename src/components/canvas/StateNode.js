import { Handle } from 'react-flow-renderer';

export default function StateNode({ data, selected, id, ...props }) {
  return (
    <div
      className="node | bg-blue text-gray-100 radius-1 py-000 px-0 border-solid border-w-2"
      data-selected={selected}>
      <div>{data.label}</div>
      <Handle type="source" position="left" id="t_a" style={{ left: '-3px' }} />
      <Handle type="source" position="top" id="t_b" style={{ top: '-3px' }} />
      <Handle
        type="source"
        position="right"
        id="t_c"
        style={{ right: '-3px' }}
      />
      <Handle
        type="source"
        position="bottom"
        id="t_d"
        style={{ bottom: '-3px' }}
      />
    </div>
  );
}
