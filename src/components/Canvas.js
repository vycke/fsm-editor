import { useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  updateEdge,
} from 'react-flow-renderer';
import { StateNode, Connection, Marker } from './CustomElements';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Canvas() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  const onConnect = (params) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          label: 'event',
          labelBgBorderRadius: 8,
          labelBgPadding: [8, 4],
          labelStyle: { fill: '#fafafa' },
          labelBgStyle: { fill: '#19232a' },
          style: { stroke: '#19232a', strokeWidth: '2' },
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

  return (
    <ReactFlowProvider>
      <main className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          className="bg-gray-100"
          markerEndId="my-marker"
          id="my-canvas"
          elements={elements}
          onConnect={onConnect}
          connectionLineComponent={Connection}
          onEdgeUpdate={onEdgeUpdate}
          connectionMode="loose"
          onLoad={setReactFlowInstance}
          onDrop={onDrop}
          multiSelectionKeyCode={null}
          onDragOver={onDragOver}
          nodeTypes={{ state: StateNode }}
        />
        <Toolbar />
      </main>
      <Sidebar setElements={setElements} />
      <Marker />
    </ReactFlowProvider>
  );
}
