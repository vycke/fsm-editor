import Switch from 'components/Switch';
import useAppStore, { store } from 'hooks/useStore';
import { cloneElement, useState } from 'react';
import Modal from '../Modal';

export default function SettingsModal({ children }) {
  const theme = useAppStore('theme');
  const [show, setShow] = useState(false);

  function handleChangeTheme() {
    store.theme = theme === 'dark' ? 'light' : 'dark';
  }

  return (
    <>
      {cloneElement(children, { onClick: () => setShow(!show), active: show })}
      {show && (
        <Modal title="Settings" onClose={() => setShow(false)}>
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
