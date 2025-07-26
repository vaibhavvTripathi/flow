// SettingsPanel shows the configuration options for a selected node. It has a mobile-style UI
// with a header bar and a text area for editing the node's message content.

import React from "react";
import { Node } from "reactflow";
import { useFlow } from "../hooks/useFlow";

interface SettingsPanelProps {
  node: Node;
  onBack?: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ node, onBack }) => {
  // Get the flow state and actions we need
  const { nodes, setNodes, deleteNode } = useFlow();
  const isTextNode = node.type === "textNode";
  
  // Local state for the text input (we sync this with the node data)
  const [value, setValue] = React.useState(node.data?.message || "");

  // Update the local state when the node data changes (e.g., when switching between nodes)
  React.useEffect(() => {
    setValue(node.data?.message || "");
  }, [node.id, node.data?.message]);

  // When the user types in the text area, update both local state and the node data
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Update the node data in the store
    setNodes(
      nodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, message: e.target.value } } : n
      )
    );
  };

  // Only show settings for text nodes (for now)
  if (!isTextNode) return <div className="p-4">No settings available for this node.</div>;

  return (
    <div className="w-56 h-full bg-white flex flex-col">
      {/* Header bar with back button and title */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <button className="mr-3" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-lg font-medium text-gray-900">Message</h1>
      </div>

      {/* Content area with text input and delete button */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Text</label>
          <textarea
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:text-blue-800 transition-colors duration-200"
            value={value}
            onChange={handleChange}
            placeholder="Enter your message..."
          />
        </div>
        
        {/* Delete button at the bottom */}
        <div className="mt-auto">
          <button
            onClick={() => {
              deleteNode(node.id);
              onBack?.();
            }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:text-red-200 focus:text-red-300 focus:ring-2 focus:ring-red-300 transition-colors duration-200"
          >
            Delete Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
