import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';

export default function NetworkGraph({ nodes, edges, selectedNodeId, onNodeSelect, onEdgeSelect }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const visNodes = nodes.map(n => ({
      id: n.id,
      label: n.name,
      title: `
        <div>
          <strong>${n.name}</strong><br/>
          Education: ${n.education}<br/>
          Experience: ${n.experience}<br/>
          Publications: ${n.publications}
        </div>
      `,
      color: n.id === selectedNodeId ? '#2563eb' : '#3b82f6',
      font: { color: 'white' },
      shape: 'dot',
      size: 20,
      borderWidth: n.id === selectedNodeId ? 3 : 1,
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
      return;
    }

    networkRef.current = new Network(containerRef.current, data, options);

    networkRef.current.on('click', (params) => {
      if (params.nodes.length > 0) {
        onNodeSelect(params.nodes[0]);
      } else if (params.edges.length > 0) {
        onEdgeSelect(params.edges[0]);
      }
    });

    return () => {
      networkRef.current.destroy();
      networkRef.current = null;
    };
  }, [nodes, edges, selectedNodeId, onNodeSelect, onEdgeSelect]);

  return (
    <div
      ref={containerRef}
      style={{ height: '600px', border: '1px solid #ddd', borderRadius: '8px' }}
      aria-label="Healthcare Professional Network Graph"
    />
  );
}
