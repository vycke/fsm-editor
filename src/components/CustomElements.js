import { Handle } from 'react-flow-renderer';

export function StateNode({ data, selected }) {
  return (
    <div
      className="node | radius-1 py-000 px-0 border-solid border-w-2"
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

export function Connection({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
}) {
  return (
    <g>
      <path
        fill="none"
        stroke="#444"
        strokeWidth={1.5}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="#444"
        strokeWidth={1.5}
      />
    </g>
  );
}

export function Marker() {
  return (
    <svg width="0" height="0">
      <defs>
        <marker
          id="my-marker"
          markerWidth="25"
          markerHeight="25"
          viewBox="-20 -20 30 40"
          orient="auto">
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            fill="#19232a"
            points="-10,-8 2,0 -10,8 -10,-8"
          />
        </marker>
      </defs>
    </svg>
  );
}
