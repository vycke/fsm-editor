import Switch from 'components/Switch';
import useAppStore, { store } from 'hooks/useStore';
import { useState } from 'react';
import Modal from '../Modal';
import { FiSettings } from 'react-icons/fi';

export default function SettingsModal() {
  const theme = useAppStore('theme');
  const [show, setShow] = useState(false);

  function handleChangeTheme() {
    store.theme = theme === 'dark' ? 'light' : 'dark';
  }

  return (
    <>
      <button
        className="text-0 hover:bg-gray-300 px-0 py-00 text-theme-front"
        onClick={() => setShow(true)}>
        <FiSettings />
      </button>
      {show && (
        <Modal title="Settings" onClose={() => setShow(false)} show={show}>
          <div className="flex-col">
            <div className="flex-row items-center">
              <span className="mr-0">Turn on dark mode * </span>
              <Switch checked={theme === 'dark'} onClick={handleChangeTheme} />
            </div>
            <span className="mt-0 text-000 italic">
              * Dark mode will also add a dark background to the exported images
            </span>
          </div>
        </Modal>
      )}
    </>
  );
}
