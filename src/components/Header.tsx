import type { Edge, Node } from "@xyflow/react";
import { useState } from "react";
import { HEADER_HEIGHT } from "./constants";

interface HeaderProps {
  nodes: Node[];
  edges: Edge[];
}
const Header = ({ nodes, edges }: HeaderProps) => {
  const [response, setResponse] = useState<string>("");
  const handleSave = () => {
    // Condition 1: Check if there is more than one node
    const hasMoreThanOneNode = nodes.length > 1;
    
    // Condition 2: Check if more than one node has an empty target handle
    let nodesWithEmptyTarget = 0;
    nodes.forEach((node) => {
      // Check if any edge has this node as a target
      const isTargetConnected = edges.some((edge) => edge.target === node.id);
      if (!isTargetConnected) nodesWithEmptyTarget++;
    });

    // Handle the conditions
    if (hasMoreThanOneNode && nodesWithEmptyTarget > 1) {
      setResponse("Cannot Save Flow");
      return;
    }
    alert("Flow saved successfully!");
  };
  return (
    <header
      className={`flex justify-between items-center bg-gray-300 px-4 py-2 h-[${HEADER_HEIGHT}]`}
    >
      <span></span>
      {response ? (
        <div className="bg-red-300 py-2 text-xs px-4 rounded-md">
          {response}
        </div>
      ) : (
        <div></div>
      )}
      <button
        className="border border-blue-500 px-4 py-2 rounded text-xs cursor-pointer bg-white"
        onClick={handleSave}
      >
        Save Flow
      </button>
    </header>
  );
};

export default Header;
