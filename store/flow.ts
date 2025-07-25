import { create } from 'zustand';
import { Node, Edge, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges, Connection } from 'reactflow';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  onConnect: (connection: Connection) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string) => void;
  clearSelectedNodeId: () => void;
  error: string | null;
  saveFlow: () => void;
  clearError: () => void;
}

const LOCAL_STORAGE_KEY = 'flowbuilder-data';

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  error: null,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  addEdge: (edge) => set({ edges: [...get().edges, edge] }),
  onConnect: (connection) => {
    const { source, target } = connection;
    if (typeof source === 'string' && typeof target === 'string') {
      set({
        edges: [
          ...get().edges,
          {
            ...connection,
            id: `${source}-${target}`,
            source,
            target,
          } as Edge,
        ],
      });
    }
  },
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  clearSelectedNodeId: () => set({ selectedNodeId: null }),
  saveFlow: () => {
    const nodes = get().nodes;
    const edges = get().edges;
    if (nodes.length <= 1) {
      set({ error: 'Cannot save Flow: You must have more than one node.' });
      return;
    }
    const nodeHasIncoming = (nodeId: string) => edges.some(e => e.target === nodeId);
    const startNodes = nodes.filter(n => !nodeHasIncoming(n.id));
    if (startNodes.length > 1) {
      set({ error: 'Cannot save Flow: Only one node can have an empty target handle (be a start node).' });
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ nodes, edges }));
    set({ error: null });
  },
  clearError: () => set({ error: null }),
})); 