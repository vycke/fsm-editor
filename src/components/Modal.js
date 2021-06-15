import useOutsideClick from 'hooks/useOutsideClick';
import useAppStore from 'hooks/useStore';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaRegTimesCircle } from 'react-icons/fa';

export default function Modal({ children, title, onClose, visible, state }) {
  const ref = useRef();
  const theme = useAppStore('theme');
  useOutsideClick(ref, visible, onClose);

  if (!visible) return null;

  return createPortal(
    <div
      id="modal"
      aria-modal={true}
      className="modal-screen"
      role="dialog"
      data-theme={theme}
      tabIndex="-1">
      <div
        data-state={state}
        className="modal-dialog | bg-theme-back-secondary shadow flex-col radius-00 p-0 text-theme-front"
        ref={ref}>
        {title && (
          <div className="text-0 flex-row justify-between items-center mb-2">
            <span className="mr-2">{title}</span>
            <button
              aria-label="close"
              onClick={onClose}
              className="text-theme-front flex-row items-center">
              <FaRegTimesCircle />
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}
