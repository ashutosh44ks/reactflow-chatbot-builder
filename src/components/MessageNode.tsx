import { Handle, Position, type NodeProps } from "@xyflow/react";

interface MessageNodeProps extends NodeProps {
  data: {
    value: string;
  };
}
function MessageNode(props: MessageNodeProps) {
  return (
    <div className="border border-gray-500 rounded min-w-[10rem]">
      <div className="bg-blue-200 flex justify-between items-center rounded-t px-2 py-1">
        <span className="text-xs font-medium">Send Message</span>
      </div>
      <div className="text-sm px-2 py-2">{props.data.value}</div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
}

export default MessageNode;
