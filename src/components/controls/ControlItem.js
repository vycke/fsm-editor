export default function ControlItem({ onClick, children, ...props }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      data-tooltip-position="left"
      onClick={onClick}
      className="flex-row items-center text-1 text-gray-100 px-00 py-00 hover:bg-blue-dark bg-blue transition-200"
      {...props}>
      {children}
    </Tag>
  );
}
