import { getSmoothStepPath } from 'react-flow-renderer';

const opposites = {
  left: 'top',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};

export default function ConnectionLine({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  connectionLineType,
  connectionLineStyle,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition: opposites[sourcePosition],
  });

  return (
    <g>
      <path
        fill="none"
        stroke="var(--color-transition)"
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="var(--color-transition)"
        strokeWidth={1.5}
      />
    </g>
  );
}
