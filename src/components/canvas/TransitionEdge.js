import getLoopPath from 'helpers/getLoopPath';
import getLabelPosition from 'helpers/labelPosition';
import { getSmoothStepPath } from 'react-flow-renderer';

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
  const edgePath =
    source !== target
      ? getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
        })
      : getLoopPath(
          { pos: sourcePosition, x: sourceX, y: sourceY },
          { pos: targetPosition, x: targetX, y: targetY }
        );

  const [x, y] = getLabelPosition(
    { pos: sourcePosition, x: sourceX, y: sourceY, id: source },
    { pos: targetPosition, x: targetX, y: targetY, id: target }
  );

  const color = 'var(--transition-color)';

  return (
    <>
      <path
        id={id}
        style={{ stroke: color, strokeWidth: '2' }}
        markerEnd="url(#arrow)"
        className="react-flow__edge-path"
        d={edgePath}
      />
      <foreignObject x={x} y={y} style={{ overflow: 'visible' }}>
        <div className="edge | flex-col items-center" data-selected={selected}>
          <span className="label | text-gray-100 radius-2 px-000 text-000">
            {data.label}
          </span>
          {data.guard && (
            <span className="guard | text-000 px-000 radius-2">
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
