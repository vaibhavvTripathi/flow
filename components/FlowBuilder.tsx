// The main FlowBuilder component is the heart of the app UI. It manages which panel is open (nodes, node settings, or edge settings),
// and wires up the canvas, state, and all the logic for adding/selecting nodes and edges.

'use client';
import React from 'react';
import NodesPanel from './NodesPanel';
import { useFlow } from '../hooks/useFlow';
import FlowBuilderCanvas from './FlowBuilderCanvas';
import SettingsPanel from './SettingsPanel';
import EdgeSettingsPanel from './EdgeSettingsPanel';
import { v4 as uuidv4 } from 'uuid';
import { Edge } from 'reactflow';

// Where new nodes will appear by default
const DEFAULT_POSITION = { x: 250, y: 150 };

const FlowBuilder = () => {
  // Grab all the flow state and actions from our custom hook (powered by Zustand)
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

  // Figure out which node (if any) is currently selected
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;
  // Track which edge is selected (for showing edge settings)
  const [selectedEdge, setSelectedEdge] = React.useState<Edge | null>(null);

  // When the user adds a node from the panel, create it with a default label/message
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

  // When an edge is clicked, open the edge settings panel and clear any node selection
  const handleEdgeClick = (edge: Edge) => {
    setSelectedEdge(edge);
    clearSelectedNodeId();
  };

  // When the back button is pressed in a panel, close both node and edge panels
  const handleBack = () => {
    setSelectedEdge(null);
    clearSelectedNodeId();
  };

  // The layout is a two-column flex: left is the canvas, right is the panel (nodes, node settings, or edge settings)
  return (
    <div className="flex w-full h-[80vh] bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
      {/* The main flow canvas (where nodes and edges live) */}
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
      {/* The right panel: show node settings, edge settings, or the node palette */}
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
