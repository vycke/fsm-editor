export default function Switch({ className, checked, onClick, label }) {
  return (
    <label htmlFor="toggle" className="switch">
      {label}
      <button
        className="ml-000"
        type="button"
        id="toggle"
        role="switch"
        aria-checked={checked}
        onClick={onClick}>
        <span>yes</span>
        <span>no</span>
      </button>
    </label>
  );
}
