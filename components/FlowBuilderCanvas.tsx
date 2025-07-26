// FlowBuilderCanvas is the interactive area where all the nodes and edges are rendered and manipulated.
// It handles selection, keyboard shortcuts, and passes all the right props to ReactFlow.

import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './TextNode';
import { useFlow } from '../hooks/useFlow';

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
  const { setSelectedNodeId, clearSelectedNodeId } = useFlow();

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
        defaultEdgeOptions={{
          type: 'bezier',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
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
