import { FiPlusCircle, FiHelpCircle } from 'react-icons/fi';

export default function ButtonBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="btn-bar | flex-row items-center mt-2 ml-2">
      <div
        className="btn | shadow bg-blue radius-2 text-gray-100 text-1"
        onDragStart={(event) => onDragStart(event, 'state')}
        data-tooltip="click, drag and drop to add a new state"
        draggable>
        <FiPlusCircle />
      </div>
      <div
        className="btn | text-gray-500 text-1"
        data-tooltip="You can use the 'backspace' key to delete a selected element.">
        <FiHelpCircle />
      </div>
    </div>
  );
}
