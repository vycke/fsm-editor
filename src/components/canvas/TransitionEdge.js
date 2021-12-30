import getLabelPosition from 'helpers/labelPosition';
import { createPath } from 'helpers/paths';

const hPair = ['left', 'right'];
const vPair = ['bottom', 'top'];

export default function TransitionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  source,
  target,
}) {
  const s = { pos: sourcePosition, x: sourceX, y: sourceY, id: source };
  const t = { pos: targetPosition, x: targetX, y: targetY, id: target };

  const edgePath = createPath(s, t);
  const [x, y] = getLabelPosition(s, t);

  const color = 'var(--color-transition)';

  return (
    <>
      <path
        id={id}
        style={{ stroke: color, strokeWidth: '2' }}
        markerEnd="url(#arrow)"
        className="react-flow__edge-path"
        d={edgePath}
      />
      <foreignObject
        x={x}
        y={y}
        width="1"
        height="1"
        style={{ overflow: 'visible' }}>
        <div className="edge | flex-col items-center" data-selected={selected}>
          <span className="label | bg-transition text-gray-100 radius-00 px-000 text-00">
            {data.label}
          </span>
          {data.guard && (
            <span className="guard | bg-back text-front text-000 px-000 radius-00">
              [{data.guard}]
            </span>
          )}
        </div>
      </foreignObject>
      <defs>
        <marker
          id="arrow"
          markerWidth="25"
          markerHeight="25"
          viewBox="-20 -20 40 40"
          orient="auto">
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            fill={color}
            points="-10,-8 1,0 -10,8 -10,-8"
          />
        </marker>
      </defs>
    </>
  );
}
