import { FiCheck, FiX } from 'react-icons/fi';

export default function Switch({ className = '', checked, onClick, label }) {
  return (
    <label htmlFor="toggle" className={`switch ${className}`}>
      {label}
      <button
        className="ml-000"
        type="button"
        id="toggle"
        role="switch"
        aria-checked={checked}
        onClick={onClick}>
        <span>
          <FiCheck />
        </span>
        <span>
          <FiX />
        </span>
      </button>
    </label>
  );
}
