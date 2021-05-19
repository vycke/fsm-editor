import { Handle } from 'react-flow-renderer';

export default function StateNode({ data, selected }) {
  return (
    <div
      className="node | radius-1 py-000 px-00 border-solid border-w-2"
      data-selected={selected}>
      <div>{data.label}</div>
      <Handle type="source" position="left" id="t_a" style={{ left: '-2px' }} />
      <Handle type="source" position="top" id="t_b" style={{ top: '-2px' }} />
      <Handle
        type="source"
        position="right"
        id="t_c"
        style={{ right: '-2px' }}
      />
      <Handle
        type="source"
        position="bottom"
        id="t_d"
        style={{ bottom: '-2px' }}
      />
    </div>
  );
}
