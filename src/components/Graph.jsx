// src/components/Graph.js
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';

const Graph = forwardRef(({ data, onNodeClick, onEdgeHover }, ref) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusNode: (id) => {
      networkRef.current?.focus(id, {
        scale: 1.5,
        animation: { duration: 1000 },
      });
    }
  }));

  useEffect(() => {
    const network = new Network(containerRef.current, data, {
      nodes: {
        shape: 'dot',
        size: 16,
        font: { size: 14 },
        color: {
          background: '#2563EB',
          border: '#1D4ED8'
        }
      },
      edges: {
        arrows: { to: true },
        font: { align: 'middle' }
      },
      physics: { stabilization: false }
    });

    networkRef.current = network;

    network.on("click", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = data.nodes.find(n => n.id === nodeId);
        onNodeClick(node);
      }
    });

    network.on("hoverEdge", (params) => {
      const edge = data.edges.find((_, index) => index === params.edge);
      if (edge) onEdgeHover(edge);
    });

  }, [data]);

  return <div ref={containerRef} style={{ height: '500px' }} />;
});

export default Graph;
