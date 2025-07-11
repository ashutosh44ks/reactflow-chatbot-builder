import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { DEFAULT_EDGES, DEFAULT_NODES } from "../components/constants";

const useReactFlowStateHandling = () => {
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

  const onEdgeDelete = useCallback((edgeId: string) => {
    setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
  }, [setEdges]);

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgeDelete,
  }
};

export default useReactFlowStateHandling;
