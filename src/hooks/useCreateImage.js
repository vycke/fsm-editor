import useToastManager from 'components/Toast';
import createImage from 'helpers/createImage';
import { useZoomPanHelper } from 'react-flow-renderer';

async function delay(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function getScale(node) {
  return parseFloat(
    node.style.transform.split(') ')[1].replace('scale(', '').replace(')', '')
  );
}

function getDimensions(nodes) {
  let hStart = 0,
    hEnd = 0,
    wStart = 0,
    wEnd = 0;

  for (let i = 0; i < nodes.children.length; i++) {
    const y = parseInt(
      nodes.children[i].style.transform.split(' ')[1].replace('px)', '')
    );
    const x = parseInt(
      nodes.children[i].style.transform
        .split(' ')[0]
        .replace(',', '')
        .replace('translate(', '')
    );

    if (y < hStart) hStart = y;
    if (y > hEnd) hEnd = y;
    if (x < wStart) wStart = x;
    if (x > wEnd) wEnd = x;
  }

  let extraWidth = 0;
  let extraHeight = 0;

  let width = wEnd - wStart + 150;
  let height = hEnd - hStart + 60;

  if (width > height) height += 170;
  else width += 220;

  return [width, height];
}

export default function useCreateImage(id) {
  const { fitView } = useZoomPanHelper();
  const { add } = useToastManager();

  async function handler() {
    add('Preparing... you will see some jumping around');
    try {
      fitView();
      await delay(100);
      const nodes = document.getElementsByClassName('react-flow__nodes')[0];
      const [width, height] = getDimensions(nodes);
      const scale = getScale(nodes);

      const canvas = document.getElementById(id);

      if (width > height) canvas.style.height = `${height + 2 * 75 * scale}px`;
      else canvas.style.width = `${width + 2 * 75 * scale}px`;

      await delay(100);

      fitView();
      await delay(100);
      await createImage(id);
      canvas.style.height = `100%`;
      canvas.style.width = `100%`;
      await delay(100);
      fitView();
      add('Image created! Select your location to store it.');
    } catch (e) {
      add('Something went wrong');
    }
  }

  return handler;
}
