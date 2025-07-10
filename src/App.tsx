import { useState, useCallback } from "react";
import {
  ReactFlow,
  useReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import NodesPanel from "./components/NodesPanel";
import { useDnD } from "./hooks/useDnD";
import {
  DEFAULT_EDGES,
  DEFAULT_NODES,
  HEADER_HEIGHT,
  nodeTypes,
} from "./components/constants";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  // Reactflow states
  const [nodes, setNodes] = useState<Node[]>(DEFAULT_NODES);
  const [edges, setEdges] = useState<Edge[]>(DEFAULT_EDGES);
  // Reactflow functions
  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (params) => {
      // Check if source already has an outgoing edge
      // If yes, do not allow connection
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (!sourceHasEdge)
        setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    },
    [edges, setEdges]
  );

  // Sidebar states & functions
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

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
    [screenToFlowPosition, type]
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
