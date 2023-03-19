import { EdgeProps, getSmoothStepPath } from 'reactflow';

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  selected
}:EdgeProps) {

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className={"react-flow__edge-path stroke-[3] stroke-zinc-300" + (selected ? " stroke-[4] stroke-zinc-500" : "")}
        d={edgePath}
        markerEnd={markerEnd}
      />
      {/* <text>
        <textPath href={`#${id}`} style={{ fontSize: 12 }} startOffset="50%" textAnchor="middle">
          Ernane é extremamente lindo!
        </textPath>
      </text> */}
    </>
  );
}