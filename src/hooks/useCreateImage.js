import useToastManager from 'components/Toast';
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import { useZoomPanHelper } from 'react-flow-renderer';

export default function useCreateImage(id) {
  const { fitView } = useZoomPanHelper();
  const { add } = useToastManager();

  async function handler() {
    var node = document.getElementById(id);
    try {
      fitView();
      add('Preparing for download...');
      const dataUrl = await toPng(node);
      download(dataUrl, 'my-finite-state-machine.png');
      add('Image created! Select your location to store it.');
    } catch (e) {
      add('Something went wrong');
    }
  }

  return handler;
}
