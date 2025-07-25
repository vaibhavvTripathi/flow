"use client";
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const nodeTypes = [
  { type: 'textNode', label: 'Message' },
  // Add more node types here as needed
];

const NodesPanel: React.FC<{ onAddNode?: (type: string) => void }> = ({ onAddNode }) => {
  return (
    <Card className="w-56 h-full p-4 flex flex-col gap-4 bg-white border border-gray-200 shadow-none">
      <h2 className="text-base font-medium mb-2 text-gray-700">Add Node</h2>
      <div className="flex flex-col gap-2">
        {nodeTypes.map((node) => (
          <Button
            key={node.type}
            variant="outline"
            onClick={() => onAddNode?.(node.type)}
            className="border-blue-600 text-blue-600 bg-white rounded-none hover:bg-blue-50 focus:ring-0 focus:outline-none font-normal px-4 py-2 justify-start"
          >
            <span className="inline-flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M7 8h10M7 12h6m-6 4h10" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {node.label}
            </span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default NodesPanel; 