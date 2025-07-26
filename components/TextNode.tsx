import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const TextNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`rounded-xl border bg-green-50 shadow-md min-w-[220px] max-w-xs ${
        selected ? 'border-green-500 border-2 shadow-lg' : 'border-green-200'
      }`}
    >
      <div className="flex items-center justify-between px-3 py-1.5 rounded-t-xl bg-green-200">
        <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M7 8h10M7 12h6m-6 4h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {data.label || 'Send Message'}
        </span>
        <span className="text-green-500">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        </span>
      </div>
      <div className="px-3 py-2 text-sm text-gray-800">{data.message || 'click to add message'}</div>
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-gray-400 w-4 h-4 -ml-2 hover:!bg-green-500 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-gray-400 w-4 h-4 -mr-2 hover:!bg-green-500 transition-colors"
      />
    </div>
  );
};

export default TextNode;
