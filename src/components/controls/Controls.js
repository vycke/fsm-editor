import useToastManager from 'components/Toast';
import {
  useStoreActions,
  useStoreState,
  useZoomPanHelper,
} from 'react-flow-renderer';
import ControlItem from './ControlItem';
import { FiMaximize, FiPlusCircle, FiShare2 } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { useContext } from 'react';
import { AppContext } from 'App';
import findStart from 'helpers/findStart';
import { stringifyMachine } from 'helpers/machineToConfig';
import { configToMachine } from 'helpers/configToMachine';
import useAppStore from 'hooks/useStore';

export default function Controls() {
  const { add } = useToastManager();
  const { setElements } = useContext(AppContext);
  const { fitView } = useZoomPanHelper();
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const setSelected = useStoreActions((actions) => actions.setSelectedElements);
  const orientation = useAppStore('orientation');

  function clear() {
    setElements([]);
    setSelected([]);
    add('Canvas cleared!');
  }

  function onDragStart(event, nodeType) {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  function layout() {
    const start = findStart(nodes, edges)?.data?.label;
    if (!start) return;
    const config = stringifyMachine(nodes, edges);
    const machine = configToMachine(start, orientation, config);

    if (!machine) return;
    setSelected([]);
    setElements(machine);
    add('Your machine magically placed itself somewhere else');

    setTimeout(() => fitView(), 250);
  }

  return (
    <div className="controls | flex-col shadow radius-000 bg-blue">
      <ControlItem
        data-tooltip="Click, drag and drop to add a new node"
        onDragStart={(event) => onDragStart(event, 'state')}
        draggable>
        <FiPlusCircle />
      </ControlItem>
      <ControlItem data-tooltip="Clear the canvas" onClick={clear}>
        <AiOutlineClear />
      </ControlItem>
      <ControlItem data-tooltip="Fit to zoom" onClick={() => fitView()}>
        <FiMaximize />
      </ControlItem>
      <ControlItem data-tooltip="Layout your machine" onClick={layout}>
        <FiShare2 />
      </ControlItem>
    </div>
  );
}
