import { useEffect } from "react";
import { useFlowStore } from "../store/flow";

const LOCAL_STORAGE_KEY = "flowbuilder-data";

export function useFlow() {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const addNode = useFlowStore((state) => state.addNode);
  const addEdge = useFlowStore((state) => state.addEdge);
  const onConnect = useFlowStore((state) => state.onConnect);
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);
  const clearSelectedNodeId = useFlowStore(
    (state) => state.clearSelectedNodeId
  );
  const error = useFlowStore((state) => state.error);
  const saveFlow = useFlowStore((state) => state.saveFlow);
  const clearError = useFlowStore((state) => state.clearError);

  // Load from localStorage on first use
  useEffect(() => {
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
    // eslint-disable-next-line
  }, []);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
    addEdge,
    onConnect,
    selectedNodeId,
    setSelectedNodeId,
    clearSelectedNodeId,
    error,
    saveFlow,
    clearError,
  };
}
