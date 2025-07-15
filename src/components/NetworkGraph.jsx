import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';

export default function NetworkGraph({
  nodes,
  edges,
  selectedNodeId,
  onNodeSelect,
  onEdgeSelect
}) {
  const containerRef = useRef();
  const networkRef = useRef();

  useEffect(() => {
    // Convert nodes to vis.js format
    const visNodes = nodes.map((n) => ({
      id: n.id,
      label: n.label,
      title: n.details,
      x: n.x,
      y: n.y,
      color: n.color || '#2563eb',
      shape: 'dot',
      size: 20,
      font: { color: '#111' },
    }));

    const visEdges = edges.map((e, idx) => ({
      id: idx,
      from: e.from,
      to: e.to,
      label: e.label,
      title: e.details,
      font: { align: 'top' },
      color: '#93c5fd',
      arrows: 'to',
    }));

    const data = { nodes: visNodes, edges: visEdges };

    const options = {
      physics: {
        enabled: true,
        stabilization: { iterations: 100 },
      },
      nodes: {
        borderWidthSelected: 3,
      },
      edges: {
        smooth: { type: 'curvedCW', roundness: 0.2 },
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        multiselect: false,
      },
      manipulation: false,
    };

    if (networkRef.current) {
      networkRef.current.setData(data);
      networkRef.current.selectNodes([selectedNodeId]);
      networkRef.current.focus(selectedNodeId, { scale: 1.2, animation: true });
    } else {
      networkRef.current = new Network(containerRef.current, data, options);

      networkRef.current.on('click', (params) => {
        if (params.nodes.length > 0) {
          onNodeSelect(params.nodes[0]);
        } else if (params.edges.length > 0) {
          onEdgeSelect(params.edges[0]);
        }
      });
    }

    // Center and zoom to selected node if present
    if (selectedNodeId) {
      const node = nodes.find((n) => n.id === selectedNodeId);
      if (node && networkRef.current) {
        networkRef.current.focus(selectedNodeId, { scale: 1.2, animation: true });
      }
    }

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [nodes, edges, selectedNodeId, onNodeSelect, onEdgeSelect]);

  return (
    <div
      ref={containerRef}
      style={{ height: '600px', border: '1px solid #ddd', borderRadius: '8px' }}
      className="transition-all duration-500 ease-in-out"
      aria-label="Healthcare Professional Network Graph"
    />
  );
}
