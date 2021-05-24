export default function ToolbarItem({ onClick, children, active, ...props }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      data-active={active}
      className="flex-row items-center text-1 text-gray-100 px-0 py-00 hover:bg-blue-dark bg-blue transition"
      {...props}>
      {children}
    </Tag>
  );
}
