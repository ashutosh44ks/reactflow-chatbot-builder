import { type Node } from "@xyflow/react";
import { SIDEBAR_WIDTH } from "./constants";

interface SettingsPanelProps {
  selectedNode: Node | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

function SettingsPanel({
  selectedNode,
  setSelectedNode,
  setNodes,
}: SettingsPanelProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedNode === null) return;
    const newData = { value: event.target.value };
    setNodes((prev) =>
      prev.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
    setSelectedNode((prev) =>
      prev?.id === selectedNode.id
        ? { ...selectedNode, data: { ...selectedNode.data, ...newData } }
        : selectedNode
    );
  };
  const handleClose = () => {
    setSelectedNode(null);
  };

  if (selectedNode === null) return null;
  return (
    <div
      className="h-full bg-white border-l border-gray-300 z-51 overflow-y-auto"
      style={{ width: SIDEBAR_WIDTH }}
    >
      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-300">
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
        >
          &lt;-
        </button>
        <h2 className="text-lg font-semibold">Message</h2>
      </div>
      {selectedNode && selectedNode?.data && (
        <div className="px-4 py-2">
          <label className="block text-sm font-medium mb-2">Text</label>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded"
            value={(selectedNode.data.value as string) || ""}
            onChange={handleTextChange}
          />
        </div>
      )}
    </div>
  );
}

export default SettingsPanel;
