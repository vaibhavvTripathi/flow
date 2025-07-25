import React from "react";
import { Node } from "reactflow";
import { useFlow } from "../hooks/useFlow";

interface SettingsPanelProps {
  node: Node;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ node }) => {
  const { nodes, setNodes } = useFlow();
  const isTextNode = node.type === "textNode";
  const [value, setValue] = React.useState(node.data?.message || "");

  React.useEffect(() => {
    setValue(node.data?.message || "");
  }, [node.id, node.data?.message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="w-56 h-full p-4 flex flex-col gap-4 bg-white border border-gray-200 shadow-none">
      <h2 className="text-base font-medium mb-2 text-gray-700">Text Node Settings</h2>
      <label className="text-sm text-gray-600 mb-1">Message Text</label>
      <input
        type="text"
        className="border rounded px-2 py-1 text-sm"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SettingsPanel; 