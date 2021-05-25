import useAppStore from 'hooks/useStore';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaRegTimesCircle } from 'react-icons/fa';

export default function Modal({ children, title, onClose, show }) {
  const ref = useRef();
  const theme = useAppStore('theme');

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target) || !show) return;
      onClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, onClose, show]);

  return createPortal(
    <div
      id="modal"
      aria-modal={true}
      className="modal-screen"
      role="dialog"
      data-theme={theme}
      tabIndex="-1">
      <div
        className="modal-dialog | shadow flex-col radius-2 p-0 text-gray-100"
        ref={ref}>
        <div className="text-0 flex-row justify-between items-center mb-2">
          <span className="mr-2">{title}</span>
          <button
            aria-label="close"
            onClick={onClose}
            className="text-gray-100 flex-row items-center">
            <FaRegTimesCircle />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}
