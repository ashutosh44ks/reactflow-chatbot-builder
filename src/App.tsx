import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  useReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import NodesPanel from "./components/NodesPanel";
import { useDnD } from "./hooks/useDnD";
import { HEADER_HEIGHT, nodeTypes } from "./components/constants";
import useReactFlowStateHandling from "./hooks/useReactFlowStateHandling";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  // Reactflow states
  const { nodes, setNodes, edges, onNodesChange, onEdgesChange, onConnect, onEdgeDelete } =
    useReactFlowStateHandling();

  // Sidebar states & functions
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      // Clear edge selection when node is clicked
      setSelectedEdge(null);
    },
    [setSelectedNode]
  );

  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setSelectedEdge(edge);
      // Clear node selection when edge is clicked
      setSelectedNode(null);
    },
    []
  );

  // Handle keyboard events for deletion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedEdge) {
          onEdgeDelete(selectedEdge.id);
          setSelectedEdge(null);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedEdge, onEdgeDelete]);

  // NodesPanel (DND) states & functions
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );
  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      // check if the dropped element is valid
      if (!type) {
        return;
      }
      // Get the position where the node was dropped
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { value: `Custom Message ${id}` },
      };
      setNodes((prev) => prev.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );
  const onDragStart: React.DragEventHandler<HTMLDivElement> = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Header nodes={nodes} edges={edges} />
      <div
        style={{
          display: "flex",
          height: `calc(100vh - ${HEADER_HEIGHT})`,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
        </ReactFlow>
        {selectedNode !== null ? (
          <SettingsPanel
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            setNodes={setNodes}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </>
  );
}
