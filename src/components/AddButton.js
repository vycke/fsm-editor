export default function AddState() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="add-button | bg-red radius-2 text-gray-100 text-3"
      onDragStart={(event) => onDragStart(event, 'state')}
      draggable>
      <span
        data-tooltip="click, drag and drop to add a new state"
        data-tooltip-position="left">
        +
      </span>
    </div>
  );
}
