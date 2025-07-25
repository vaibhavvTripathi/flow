"use client";
import React from "react";
import NodesPanel from "./NodesPanel";
import { useFlow } from "../hooks/useFlow";
import FlowBuilderCanvas from "./FlowBuilderCanvas";
import SettingsPanel from "./SettingsPanel";
import { v4 as uuidv4 } from "uuid";

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
  } = useFlow();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const handleAddNode = (type: string) => {
    let data = { label: "Send Message", message: "test message 2" };
    if (type !== "textNode") {
      data = { label: type, message: "" };
    }
    const newNode = {
      id: uuidv4(),
      type,
      position: DEFAULT_POSITION,
      data,
    };
    addNode(newNode);
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
