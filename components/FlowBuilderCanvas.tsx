import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
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
  const { setSelectedNodeId, clearSelectedNodeId, deleteNode, deleteEdge } = useFlow();

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();

        // Get selected elements from ReactFlow
        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);

        // Delete selected nodes
        selectedNodes.forEach((node) => {
          deleteNode(node.id);
        });

        // Delete selected edges
        selectedEdges.forEach((edge) => {
          deleteEdge(edge.id);
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, deleteNode, deleteEdge]);

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
          console.log('Node clicked:', node);
          setSelectedNodeId(node.id);
        }}
        onEdgeClick={(_, edge) => {
          console.log('Edge clicked:', edge);
          onEdgeClick?.(edge);
        }}
        onPaneClick={clearSelectedNodeId}
        deleteKeyCode="Delete"
      >
        <Background color="#e5e7eb" gap={24} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilderCanvas;
