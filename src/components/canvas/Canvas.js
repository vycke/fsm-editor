import ReactFlow, {
  addEdge,
  updateEdge,
  useStoreActions,
  useZoomPanHelper,
} from 'react-flow-renderer';

import ConnectionLine from './ConnectionLine';
import StateNode from './StateNode';
import TransitionEdge from './TransitionEdge';
import gId from '../../helpers/generateId';

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
      const newEl = { ...p, type: 'transition', data: { label: 'event' } };
      const newEls = addEdge(newEl, els);

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
    const newNode = { id: gId(), type, position, data: { label: `state` } };
    setElements((es) => es.concat(newNode));
    setSelected([newNode]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  function handleLoad(instance) {
    onLoad(instance);
    fitView({ padding: 1.2 });
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
