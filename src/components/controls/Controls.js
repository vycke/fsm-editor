import useToastManager from 'components/Toast';
import { useZoomPanHelper } from 'react-flow-renderer';
import ControlItem from './ControlItem';
import { FiMaximize, FiPlusCircle } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { useContext } from 'react';
import { AppContext } from 'App';

export default function Controls() {
  const { add } = useToastManager();
  const { setElements } = useContext(AppContext);
  const { fitView } = useZoomPanHelper();

  function clear() {
    setElements([]);
    add('Canvas cleared!');
  }

  function onDragStart(event, nodeType) {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div className="controls | flex-col shadow radius-1 bg-blue">
      <ControlItem
        data-tooltip="Click, drag and drop to add a new node"
        onDragStart={(event) => onDragStart(event, 'state')}
        draggable>
        <FiPlusCircle />
      </ControlItem>
      <ControlItem data-tooltip="Clear the canvas" onClick={clear}>
        <AiOutlineClear />
      </ControlItem>
      <ControlItem data-tooltip="Fit to zoom" onClick={() => fitView()}>
        <FiMaximize />
      </ControlItem>
    </div>
  );
}
