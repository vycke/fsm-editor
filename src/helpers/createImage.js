import { toPng } from 'html-to-image';
import download from 'downloadjs';
export default async function createImage(
  id,
  name = 'my-finite-state-machine'
) {
  var node = document.getElementById(id);
  try {
    const dataUrl = await toPng(node);
    download(dataUrl, `${name}.png`);
  } catch (e) {
    throw e;
  }
}
