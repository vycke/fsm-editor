import useCreateImage from 'hooks/useCreateImage';
import {
  FiHelpCircle,
  FiPlusCircle,
  FiImage,
  FiMaximize,
  FiSettings,
} from 'react-icons/fi';
import { BiCodeCurly } from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import ClipboardModal from './ClipboardModal';
import HelpModal from './HelpModal';
import { useZoomPanHelper } from 'react-flow-renderer';
import ToolbarItem from './ToolbarItem';
import SettingsModal from './SettingsModal';
import useToastManager from 'components/Toast';

export default function Toolbar({ setElements }) {
  const downloadImage = useCreateImage('my-canvas');
  const { add } = useToastManager();
  const { fitView } = useZoomPanHelper();

  function onDragStart(event, nodeType) {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  function clear() {
    setElements([]);
    add('Canvas cleared!');
  }

  return (
    <div className="toolbar | flex-row radius-2 shadow bg-blue">
      <ToolbarItem
        data-tooltip="Click, drag and drop to add a new node"
        onDragStart={(event) => onDragStart(event, 'state')}
        draggable>
        <FiPlusCircle />
      </ToolbarItem>
      <ToolbarItem
        data-tooltip="Fit to zoom"
        onClick={() => fitView({ padding: 1.5 })}>
        <FiMaximize />
      </ToolbarItem>
      <ToolbarItem
        data-tooltip="Clear the canvas, this action cannot be undone"
        onClick={clear}>
        <AiOutlineClear />
      </ToolbarItem>
      <ToolbarItem
        data-tooltip="Export the current canvas to a .PNG file"
        onClick={downloadImage}>
        <FiImage />
      </ToolbarItem>
      <ClipboardModal>
        <ToolbarItem data-tooltip="View and copy the FSM configuration as JSON to your clipboard">
          <BiCodeCurly />
        </ToolbarItem>
      </ClipboardModal>
      <SettingsModal>
        <ToolbarItem data-tooltip="Editor settings">
          <FiSettings />
        </ToolbarItem>
      </SettingsModal>
      <HelpModal>
        <ToolbarItem data-tooltip="You can use the 'backspace' key to delete a selected element">
          <FiHelpCircle />
        </ToolbarItem>
      </HelpModal>
    </div>
  );
}
