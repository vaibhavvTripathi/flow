import React from 'react';
import { Node } from 'reactflow';
import { useFlow } from '../hooks/useFlow';

interface SettingsPanelProps {
  node: Node;
  onBack?: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ node, onBack }) => {
  const { nodes, setNodes, deleteNode } = useFlow();
  const isTextNode = node.type === 'textNode';
  const [value, setValue] = React.useState(node.data?.message || '');

  React.useEffect(() => {
    setValue(node.data?.message || '');
  }, [node.id, node.data?.message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Update node data in Zustand
    setNodes(
      nodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, message: e.target.value } } : n
      )
    );
  };

  if (!isTextNode) return <div className="p-4">No settings available for this node.</div>;

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
        <h1 className="text-lg font-medium text-gray-900">Message</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Text</label>
          <textarea
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value}
            onChange={handleChange}
            placeholder="Enter your message..."
          />
        </div>

        {/* Delete Button */}
        <div className="mt-auto">
          <button
            onClick={() => {
              deleteNode(node.id);
              onBack?.();
            }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
