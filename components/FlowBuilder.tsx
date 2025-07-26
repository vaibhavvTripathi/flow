'use client';
import React from 'react';
import NodesPanel from './NodesPanel';
import { useFlow } from '../hooks/useFlow';
import FlowBuilderCanvas from './FlowBuilderCanvas';
import SettingsPanel from './SettingsPanel';
import EdgeSettingsPanel from './EdgeSettingsPanel';
import { v4 as uuidv4 } from 'uuid';
import { Edge } from 'reactflow';

const DEFAULT_POSITION = { x: 250, y: 150 };

const FlowBuilder = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    selectedNodeId,
    clearSelectedNodeId,
  } = useFlow();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;
  const [selectedEdge, setSelectedEdge] = React.useState<Edge | null>(null);

  const handleAddNode = (type: string) => {
    let data = { label: 'Send Message', message: 'click to add message' };
    if (type !== 'textNode') {
      data = { label: type, message: '' };
    }
    const newNode = {
      id: uuidv4(),
      type,
      position: DEFAULT_POSITION,
      data,
    };
    addNode(newNode);
  };

  const handleEdgeClick = (edge: Edge) => {
    setSelectedEdge(edge);
    clearSelectedNodeId();
  };

  const handleBack = () => {
    setSelectedEdge(null);
    clearSelectedNodeId();
  };

  return (
    <div className="flex w-full h-[80vh] bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
      {/* Main flow area */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <FlowBuilderCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={handleEdgeClick}
        />
      </div>
      {selectedNode ? (
        <SettingsPanel node={selectedNode} onBack={handleBack} />
      ) : selectedEdge ? (
        <EdgeSettingsPanel edge={selectedEdge} onBack={handleBack} />
      ) : (
        <NodesPanel onAddNode={handleAddNode} />
      )}
    </div>
  );
};

export default FlowBuilder;
