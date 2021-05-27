import generateId from 'helpers/generateId';
import ReactFlow, {
  addEdge,
  updateEdge,
  useStoreActions,
  useZoomPanHelper,
} from 'react-flow-renderer';

import ConnectionLine from './ConnectionLine';
import StateNode from './StateNode';
import TransitionEdge from './TransitionEdge';

export default function Canvas({
  wrapper,
  elements,
  setElements,
  onLoad,
  instance,
}) {
  const { fitView } = useZoomPanHelper();
  const setSelected = useStoreActions((actions) => actions.setSelectedElements);

  const onConnect = (p) => {
    // disallow connecting to the self handle
    if (p.source === p.target && p.sourceHandle === p.targetHandle) return;

    // select on add
    const element = setElements((els) => {
      const newEls = addEdge(
        { ...p, type: 'transition', data: { label: 'event' } },
        els
      );

      setSelected([newEls[newEls.length - 1]]);
      return newEls;
    });
  };

  const onEdgeUpdate = (old, con) => {
    setElements((els) => {
      // Select on update
      const newEls = updateEdge(old, con, els);
      const el = newEls.find(
        (e) => e.source === con.source && e.target === con.target
      );
      setSelected([el]);
      return newEls;
    });
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = wrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = instance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: generateId(),
      type,
      position,
      data: { label: `new ${type}` },
    };

    setElements((es) => es.concat(newNode));
    setSelected([newNode]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  function handleLoad(instance) {
    onLoad(instance);
    fitView();
  }

  return (
    <ReactFlow
      className="canvas"
      id="my-canvas"
      elements={elements}
      onConnect={onConnect}
      connectionLineComponent={ConnectionLine}
      onEdgeUpdate={onEdgeUpdate}
      connectionMode="loose"
      onLoad={handleLoad}
      onDrop={onDrop}
      multiSelectionKeyCode={null}
      onDragOver={onDragOver}
      nodeTypes={{ state: StateNode }}
      edgeTypes={{ transition: TransitionEdge }}
    />
  );
}
