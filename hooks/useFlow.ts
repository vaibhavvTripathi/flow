import { useFlowStore } from '../store/flow';

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
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useFlowStore((state) => state.setSelectedNodeId);
  const clearSelectedNodeId = useFlowStore((state) => state.clearSelectedNodeId);
  const error = useFlowStore((state) => state.error);
  const success = useFlowStore((state) => state.success);
  const saveFlow = useFlowStore((state) => state.saveFlow);
  const clearError = useFlowStore((state) => state.clearError);
  const clearSuccess = useFlowStore((state) => state.clearSuccess);

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
    deleteNode,
    deleteEdge,
    selectedNodeId,
    setSelectedNodeId,
    clearSelectedNodeId,
    error,
    success,
    saveFlow,
    clearError,
    clearSuccess,
  };
}
