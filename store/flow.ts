import { create } from 'zustand';
import {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
} from 'reactflow';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  initialized: boolean;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  onConnect: (connection: Connection) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string) => void;
  clearSelectedNodeId: () => void;
  error: string | null;
  success: string | null;
  saveFlow: () => void;
  clearError: () => void;
  clearSuccess: () => void;
  init: () => void;
  initializeFromStorage: () => void;
}

const LOCAL_STORAGE_KEY = 'flowbuilder-data';

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  initialized: false,
  selectedNodeId: null,
  error: null,
  success: null,
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
  deleteNode: (nodeId) => {
    const state = get();
    // Remove the node
    const updatedNodes = state.nodes.filter((node) => node.id !== nodeId);
    // Remove all edges connected to this node
    const updatedEdges = state.edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    set({ nodes: updatedNodes, edges: updatedEdges });
  },
  deleteEdge: (edgeId) => {
    const state = get();
    const updatedEdges = state.edges.filter((edge) => edge.id !== edgeId);
    set({ edges: updatedEdges });
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
    const nodeHasIncoming = (nodeId: string) => edges.some((e) => e.target === nodeId);
    const startNodes = nodes.filter((n) => !nodeHasIncoming(n.id));
    if (startNodes.length > 1) {
      set({
        error: 'Cannot save Flow: Only one node can have an empty target handle (be a start node).',
      });
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ nodes, edges }));
    set({ error: null, success: 'Flow saved successfully!' });
  },
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
  init: () => {
    const state = get();
    if (state.initialized) return;

    if (typeof window === 'undefined') {
      set({ initialized: true });
      return;
    }

    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const { nodes, edges } = JSON.parse(savedData);
        if (Array.isArray(nodes) && Array.isArray(edges)) {
          set({ nodes, edges, initialized: true });
        } else {
          set({ initialized: true });
        }
      } else {
        set({ initialized: true });
      }
    } catch {
      set({ initialized: true });
    }
  },
  initializeFromStorage: () => {
    get().init();
  },
}));

// Call init immediately when store is created
useFlowStore.getState().init();
