export default function InfoButton() {
  return (
    <div className="info-button | bg-gray-300 radius-2 text-gray-100 text-0">
      <span
        data-tooltip="You can use the 'backspace' key to delete a selected element."
        data-tooltip-position="left">
        ?
      </span>
    </div>
  );
}
