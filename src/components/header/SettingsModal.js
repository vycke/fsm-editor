import Switch from 'components/Switch';
import { store } from 'hooks/useStore';
import Modal from '../Modal';
import { FiSettings } from 'react-icons/fi';
import useTheme from 'hooks/useTheme';
import useOrientation from 'hooks/useOrientation';
import useModalTransition from 'hooks/useModalTransition';

export default function SettingsModal() {
  const theme = useTheme();
  const { visible, close, open, state } = useModalTransition();
  const orientation = useOrientation();

  function handleChangeTheme() {
    store.theme = theme === 'dark' ? 'light' : 'dark';
  }

  function handleChangeOrienttation() {
    store.orientation =
      orientation === 'horizontal' ? 'vertical' : 'horizontal';
  }

  return (
    <>
      <button
        className="text-1 hover:bg-gray-300 px-0 py-00 text-front"
        onClick={open}>
        <FiSettings />
      </button>

      <Modal title="Settings" onClose={close} visible={visible} state={state}>
        <div className="flex-col">
          <div className="flex-row items-center">
            <span className="mr-0 flex-grow">
              Prefer horizontal orientation{' '}
            </span>
            <Switch
              className="mr-3"
              checked={orientation === 'horizontal'}
              onClick={handleChangeOrienttation}
            />
          </div>
          <div className="flex-row items-center mt-0">
            <span className="mr-0 flex-grow">Turn on dark mode * </span>
            <Switch
              className="mr-3"
              checked={theme === 'dark'}
              onClick={handleChangeTheme}
            />
          </div>
          <span className="mt-00 text-000 italic">
            * Dark mode will also add a dark background to the exported images
          </span>
        </div>
      </Modal>
    </>
  );
}
