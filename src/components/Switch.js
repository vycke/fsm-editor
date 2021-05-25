export default function Switch({ className, checked, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handleClick} />
      <span className="slider" />
    </label>
  );
}
