import { getSmoothStepPath } from 'react-flow-renderer';

export default function ConnectionLine({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <g>
      <path
        fill="none"
        stroke="#444"
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="var(--transition-color)"
        strokeWidth={1.5}
      />
    </g>
  );
}
