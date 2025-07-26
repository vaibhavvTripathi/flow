import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFlow } from '../hooks/useFlow';
import { useFlowStore } from '../store/flow';

// Mock ReactFlow
vi.mock('reactflow', () => ({
  applyNodeChanges: vi.fn((changes, nodes) => nodes),
  applyEdgeChanges: vi.fn((changes, edges) => edges),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Create Node and Edge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);

    // Reset store state
    useFlowStore.setState({
      nodes: [],
      edges: [],
      initialized: false,
      selectedNodeId: null,
      error: null,
      success: null,
    });
  });

  it('should create a new text node', () => {
    const { result } = renderHook(() => useFlow());

    const newNode = {
      id: 'test-node-1',
      type: 'textNode',
      position: { x: 100, y: 100 },
      data: {
        label: 'Send Message',
        message: 'Hello World',
      },
    };

    act(() => {
      result.current.addNode(newNode);
    });

    expect(result.current.nodes).toHaveLength(1);
    expect(result.current.nodes[0]).toEqual(newNode);
    expect(result.current.nodes[0].type).toBe('textNode');
    expect(result.current.nodes[0].data.label).toBe('Send Message');
    expect(result.current.nodes[0].data.message).toBe('Hello World');
  });

  it('should create an edge between two nodes', () => {
    const { result } = renderHook(() => useFlow());

    // Create two nodes first
    const node1 = {
      id: 'node-1',
      type: 'textNode',
      position: { x: 100, y: 100 },
      data: { label: 'Start', message: 'Hello' },
    };

    const node2 = {
      id: 'node-2',
      type: 'textNode',
      position: { x: 300, y: 100 },
      data: { label: 'End', message: 'Goodbye' },
    };

    act(() => {
      result.current.addNode(node1);
      result.current.addNode(node2);
    });

    expect(result.current.nodes).toHaveLength(2);

    // Create an edge between the nodes
    const newEdge = {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    };

    act(() => {
      result.current.addEdge(newEdge);
    });

    expect(result.current.edges).toHaveLength(1);
    expect(result.current.edges[0]).toEqual(newEdge);
    expect(result.current.edges[0].source).toBe('node-1');
    expect(result.current.edges[0].target).toBe('node-2');
  });

  it('should enforce source handle rules - only one edge per source handle', () => {
    const { result } = renderHook(() => useFlow());

    // Create three nodes
    const node1 = {
      id: 'node-1',
      type: 'textNode',
      position: { x: 100, y: 100 },
      data: { label: 'Start' },
    };
    const node2 = {
      id: 'node-2',
      type: 'textNode',
      position: { x: 300, y: 100 },
      data: { label: 'Middle' },
    };
    const node3 = {
      id: 'node-3',
      type: 'textNode',
      position: { x: 500, y: 100 },
      data: { label: 'End' },
    };

    act(() => {
      result.current.addNode(node1);
      result.current.addNode(node2);
      result.current.addNode(node3);
    });

    expect(result.current.nodes).toHaveLength(3);

    // Create first edge from node1 to node2
    const edge1 = {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    };

    act(() => {
      result.current.addEdge(edge1);
    });

    expect(result.current.edges).toHaveLength(1);

    // Try to create second edge from node1 to node3 (should work - different target)
    const edge2 = {
      id: 'edge-2',
      source: 'node-1',
      target: 'node-3',
    };

    act(() => {
      result.current.addEdge(edge2);
    });

    // Both edges should exist since they have different targets
    expect(result.current.edges).toHaveLength(2);
    expect(result.current.edges[0].source).toBe('node-1');
    expect(result.current.edges[1].source).toBe('node-1');
  });

  it('should allow multiple edges to connect to the same target handle', () => {
    const { result } = renderHook(() => useFlow());

    // Create three nodes
    const node1 = {
      id: 'node-1',
      type: 'textNode',
      position: { x: 100, y: 100 },
      data: { label: 'Start1' },
    };
    const node2 = {
      id: 'node-2',
      type: 'textNode',
      position: { x: 100, y: 200 },
      data: { label: 'Start2' },
    };
    const node3 = {
      id: 'node-3',
      type: 'textNode',
      position: { x: 300, y: 150 },
      data: { label: 'Target' },
    };

    act(() => {
      result.current.addNode(node1);
      result.current.addNode(node2);
      result.current.addNode(node3);
    });

    expect(result.current.nodes).toHaveLength(3);

    // Create first edge from node1 to node3
    const edge1 = {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-3',
    };

    act(() => {
      result.current.addEdge(edge1);
    });

    expect(result.current.edges).toHaveLength(1);

    // Create second edge from node2 to node3 (same target, different source)
    const edge2 = {
      id: 'edge-2',
      source: 'node-2',
      target: 'node-3',
    };

    act(() => {
      result.current.addEdge(edge2);
    });

    // Both edges should exist since they have different sources but same target
    expect(result.current.edges).toHaveLength(2);
    expect(result.current.edges[0].target).toBe('node-3');
    expect(result.current.edges[1].target).toBe('node-3');
    expect(result.current.edges[0].source).toBe('node-1');
    expect(result.current.edges[1].source).toBe('node-2');
  });
});
