import { useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  removeElements,
  updateEdge,
  Controls,
} from 'react-flow-renderer';
import StateNode from './StateNode';
import AddState from './AddButton';
import Sidebar from './Sidebar';
import InfoButton from './InfoButton';

const nodeTypes = {
  state: StateNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Canvas({ init }) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(init);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          animated: true,
          arrowHeadType: 'arrowclosed',
          label: 'label',
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

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  function updateElement(v, id, isEdge) {
    setElements((es) =>
      es.map((e) => {
        if (e.id !== id) return e;

        console.log(id, e);

        const newEl = { ...e };

        console.log(newEl);

        if (isEdge) newEl.label = v;
        else newEl.data.label = v;

        return newEl;
      })
    );

    console.log(v, id, isEdge);
    console.log(elements);
  }

  return (
    <ReactFlowProvider>
      <main className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          connectionMode="loose"
          deleteKeyCode={8} /* 'backspace'-key */
          onLoad={onLoad}
          onDrop={onDrop}
          multiSelectionKeyCode={null}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}>
          <Controls />
        </ReactFlow>
      </main>
      <Sidebar onUpdateElement={updateElement} />
      <AddState />
      <InfoButton />
    </ReactFlowProvider>
  );
}
