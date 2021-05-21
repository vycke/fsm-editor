import useCreateImage from 'hooks/useCreateImage';
import {
  FiHelpCircle,
  FiPlusCircle,
  FiImage,
  FiMaximize,
} from 'react-icons/fi';
import { BiCodeCurly } from 'react-icons/bi';
import ClipboardModal from './ClipboardModal';
import HelpModal from './HelpModal';
import { useZoomPanHelper } from 'react-flow-renderer';

function Item({ onClick, children, active, ...props }) {
  const style = active ? 'bg-gray-400' : 'bg-blue';

  if (onClick)
    return (
      <button
        onClick={onClick}
        className={`flex-row items-center text-1 text-gray-100 px-0 py-00 hover:bg-gray-400 ${style}`}
        {...props}>
        {children}
      </button>
    );

  return (
    <div
      className={`flex-row items-center text-1 text-gray-100 px-0 py-00 hover:bg-gray-400 ${style}`}
      {...props}>
      {children}
    </div>
  );
}

export default function Toolbar() {
  const downloadImage = useCreateImage('my-canvas');
  const { fitView } = useZoomPanHelper();

  function onDragStart(event, nodeType) {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div className="toolbar | flex-row radius-2 shadow bg-blue">
      <Item
        data-tooltip="Click, drag and drop to add a new node"
        onDragStart={(event) => onDragStart(event, 'state')}
        draggable>
        <FiPlusCircle />
      </Item>
      <Item data-tooltip="Fit to zoom" onClick={fitView}>
        <FiMaximize />
      </Item>
      <Item
        data-tooltip="Export the current canvas to a .PNG file"
        onClick={downloadImage}>
        <FiImage />
      </Item>
      <ClipboardModal>
        <Item data-tooltip="View and copy the FSM configuration as JSON to your clipboard">
          <BiCodeCurly />
        </Item>
      </ClipboardModal>
      <HelpModal>
        <Item data-tooltip="You can use the 'backspace' key to delete a selected element">
          <FiHelpCircle />
        </Item>
      </HelpModal>
    </div>
  );
}
