import type { DragEvent } from "react";
import { useDnD } from "../hooks/useDnD";
import { nodeTypes, SIDEBAR_WIDTH } from "./constants";

function NodesPanel() {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      className="flex flex-col gap-4 p-2 h-full bg-white border-l border-gray-300 z-50 overflow-y-auto"
      style={{ width: SIDEBAR_WIDTH }}
    >
      {Object.keys(nodeTypes).map((type) => (
        <div
          key={type}
          className="px-4 py-2 border border-gray-300 flex items-center gap-40"
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type}
        </div>
      ))}
    </div>
  );
}

export default NodesPanel;
