import React, { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "./TextNode";
import { useFlow } from "../hooks/useFlow";

const nodeTypes = { textNode: TextNode };
const defaultViewport = { x: 0, y: 0, zoom: 1 };

interface FlowBuilderCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

const FlowBuilderCanvas: React.FC<FlowBuilderCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}) => {
  const { setSelectedNodeId, clearSelectedNodeId } = useFlow();

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="!bg-gray-50"
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        onNodeClick={(_, node) => {
          console.log("Node clicked:", node);
          setSelectedNodeId(node.id);
        }}
        onPaneClick={clearSelectedNodeId}
      >
        <Background color="#e5e7eb" gap={24} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilderCanvas;
