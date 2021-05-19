import { useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  removeElements,
  updateEdge,
  Controls,
} from 'react-flow-renderer';
import StateNode from './StateNode';
import Sidebar from './Sidebar';
import ButtonBar from './Buttons';
import Connection from './Connection';

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Canvas() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          label: 'event',
          style: { stroke: '#444', strokeWidth: '2' },
        },
        els
      )
    );
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `new ${type}` },
    };

    setElements((es) => es.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const updateElement = (v, id, isEdge) =>
    setElements((es) =>
      es.map((e) => {
        if (e.id !== id) return e;

        const newEl = { ...e };
        if (isEdge) newEl.label = v;
        else newEl.data.label = v;

        return newEl;
      })
    );

  return (
    <ReactFlowProvider>
      <main className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          markerEndId="my-marker"
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          connectionLineComponent={Connection}
          onEdgeUpdate={onEdgeUpdate}
          connectionMode="loose"
          deleteKeyCode={8} /* 'backspace'-key */
          onLoad={setReactFlowInstance}
          onDrop={onDrop}
          multiSelectionKeyCode={null}
          onDragOver={onDragOver}
          nodeTypes={{ state: StateNode }}>
          <Controls />
        </ReactFlow>
      </main>
      <Sidebar onUpdateElement={updateElement} />
      <ButtonBar />
      <svg width="0" height="0">
        <defs>
          <marker
            id="my-marker"
            markerWidth="25"
            markerHeight="25"
            viewBox="-20 -20 40 40"
            orient="auto">
            <polyline
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              fill="#444"
              points="-10,-8 0,0 -10,8 -10,-8"
            />
          </marker>
        </defs>
      </svg>
    </ReactFlowProvider>
  );
}
