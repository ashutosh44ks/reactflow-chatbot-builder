import MessageNode from "./MessageNode";

export const nodeTypes = {
  MessageNode: MessageNode,
};

export const DEFAULT_NODES = [
  {
    id: "node-1",
    type: "MessageNode",
    position: { x: 0, y: 0 },
    data: { value: "Custom Message 1" },
  },
  {
    id: "node-2",
    type: "MessageNode",
    position: { x: 300, y: 0 },
    data: { value: "Custom Message 2" },
  },
  {
    id: "node-3",
    type: "MessageNode",
    position: { x: 600, y: 0 },
    data: { value: "Custom Message 3" },
  },
  {
    id: "node-4",
    type: "MessageNode",
    position: { x: 900, y: 0 },
    data: { value: "Custom Message 4" },
  },
];
export const DEFAULT_EDGES = [
  {
    source: "node-3",
    target: "node-2",
    id: "xy-edge__node-3-node-2",
  },
];

export const HEADER_HEIGHT = "50px";
export const SIDEBAR_WIDTH = "300px";