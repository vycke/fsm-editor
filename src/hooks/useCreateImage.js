import useToastManager from 'components/Toast';
import createImage from 'helpers/createImage';
import { useZoomPanHelper } from 'react-flow-renderer';

export default function useCreateImage(id) {
  const { fitView } = useZoomPanHelper();
  const { add } = useToastManager();

  async function handler() {
    try {
      fitView();
      add('Preparing for download...');
      await createImage(id);
      add('Image created! Select your location to store it.');
    } catch (e) {
      add('Something went wrong');
    }
  }

  return handler;
}
