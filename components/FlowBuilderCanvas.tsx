// FlowBuilderCanvas is the interactive area where all the nodes and edges are rendered and manipulated.
// It handles selection, keyboard shortcuts, and passes all the right props to ReactFlow.

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
  onEdgeClick?: (edge: Edge) => void;
}

const FlowBuilderCanvas: React.FC<FlowBuilderCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onEdgeClick,
}) => {
  // We use the flow store for selection logic
  const { setSelectedNodeId, clearSelectedNodeId, deleteNode, deleteEdge } = useFlow();

  // Keyboard shortcuts: delete selected nodes/edges with Delete or Backspace
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        // Find all selected nodes and edges
        const selectedNodes = nodes.filter(node => node.selected);
        const selectedEdges = edges.filter(edge => edge.selected);
        // Delete all selected nodes
        selectedNodes.forEach(node => {
          deleteNode(node.id);
        });
        // Delete all selected edges
        selectedEdges.forEach(edge => {
          deleteEdge(edge.id);
        });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, deleteNode, deleteEdge]);

  // The ReactFlow component does all the heavy lifting for rendering and interaction
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
        // When a node is clicked, select it
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
        }}
        // When an edge is clicked, open the edge settings panel
        onEdgeClick={(_, edge) => {
          onEdgeClick?.(edge);
        }}
        // Clicking the background clears selection
        onPaneClick={clearSelectedNodeId}
        deleteKeyCode="Delete"
      >
        {/* Background grid for visual clarity */}
        <Background color="#e5e7eb" gap={24} />
        {/* MiniMap and Controls for navigation (optional) */}
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilderCanvas;
