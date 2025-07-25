"use client";
import React from "react";
import NodesPanel from "./NodesPanel";
import { useFlow } from "../hooks/useFlow";
import FlowBuilderCanvas from "./FlowBuilderCanvas";
import SettingsPanel from "./SettingsPanel";

const getId = (() => {
  let id = 0;
  return () => `node_${id++}`;
})();

const DEFAULT_POSITION = { x: 250, y: 150 };
const LOCAL_STORAGE_KEY = 'flowbuilder-data';

const FlowBuilder = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    selectedNodeId,
    setNodes,
    setEdges,
  } = useFlow();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const [error, setError] = React.useState<string | null>(null);

  // Load from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(saved);
        if (Array.isArray(savedNodes) && Array.isArray(savedEdges)) {
          setNodes(savedNodes);
          setEdges(savedEdges);
        }
      } catch {}
    }
  }, [setNodes, setEdges]);

  const handleAddNode = (type: string) => {
    let data = { label: "Send Message", message: "test message 2" };
    if (type !== "textNode") {
      data = { label: type, message: "" };
    }
    const newNode = {
      id: getId(),
      type,
      position: DEFAULT_POSITION,
      data,
    };
    addNode(newNode);
  };

  // Validation: Only one node can have no incoming edges (empty target handle)
  const canSaveFlow = () => {
    if (nodes.length <= 1) return false;
    // A node with no incoming edges is a start node
    const nodeHasIncoming = (nodeId: string) => edges.some(e => e.target === nodeId);
    const startNodes = nodes.filter(n => !nodeHasIncoming(n.id));
    return startNodes.length <= 1;
  };

  const handleSave = () => {
    if (!canSaveFlow()) {
      setError('Cannot save Flow: Only one node can have an empty target handle (be a start node), and you must have more than one node.');
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ nodes, edges }));
    setError(null);
  };

  return (
    <div className="flex w-full h-[80vh] bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
      {error && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-200 text-red-800 px-4 py-2 rounded shadow z-50">
          {error}
        </div>
      )}
      {/* Main flow area */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <FlowBuilderCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
      {selectedNode ? (
        <SettingsPanel node={selectedNode} />
      ) : (
        <NodesPanel onAddNode={handleAddNode} />
      )}
    </div>
  );
};

export default FlowBuilder;
