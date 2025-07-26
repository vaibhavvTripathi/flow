import React from 'react';
import { Edge } from 'reactflow';
import { useFlow } from '../hooks/useFlow';

interface EdgeSettingsPanelProps {
  edge: Edge;
  onBack: () => void;
}

const EdgeSettingsPanel: React.FC<EdgeSettingsPanelProps> = ({ edge, onBack }) => {
  const { deleteEdge, nodes } = useFlow();

  // Find the source and target nodes to get their labels
  const sourceNode = nodes.find((node) => node.id === edge.source);
  const targetNode = nodes.find((node) => node.id === edge.target);

  const sourceLabel = sourceNode?.data?.label || 'Unknown Node';
  const targetLabel = targetNode?.data?.label || 'Unknown Node';

  return (
    <div className="w-56 h-full bg-white flex flex-col">
      {/* Header Bar */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <button className="mr-3" onClick={onBack}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-medium text-gray-900">Connection</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Connection Details</label>
          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">From:</span>
              <span className="text-sm text-gray-700">{sourceLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">To:</span>
              <span className="text-sm text-gray-700">{targetLabel}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="text-xs text-gray-500">Connection ID: {edge.id}</div>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <div className="mt-auto">
          <button
            onClick={() => {
              deleteEdge(edge.id);
              onBack();
            }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeSettingsPanel;
