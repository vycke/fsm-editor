import generateId from 'helpers/generateId';
import { useState } from 'react';
import ReactFlow, {
  addEdge,
  updateEdge,
  useStoreActions,
} from 'react-flow-renderer';

import ConnectionLine from './ConnectionLine';
import StateNode from './StateNode';
import TransitionEdge from './TransitionEdge';

export default function Canvas({ wrapper, elements, setElements }) {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const setSelected = useStoreActions((actions) => actions.setSelectedElements);

  const onConnect = (params) => {
    setElements((els) =>
      addEdge({ ...params, type: 'transition', data: { label: 'event' } }, els)
    );
    setSelected([]);
  };

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = wrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
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

  return (
    <ReactFlow
      className="canvas"
      id="my-canvas"
      elements={elements}
      onConnect={onConnect}
      connectionLineComponent={ConnectionLine}
      onEdgeUpdate={onEdgeUpdate}
      connectionMode="loose"
      onLoad={setReactFlowInstance}
      onDrop={onDrop}
      multiSelectionKeyCode={null}
      onDragOver={onDragOver}
      nodeTypes={{ state: StateNode }}
      edgeTypes={{ transition: TransitionEdge }}
    />
  );
}
