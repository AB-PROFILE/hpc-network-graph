import React, { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
 

export default function NetworkGraph({
  nodes,
  edges,
  selectedNodeId,
  onNodeSelect,
  onEdgeSelect
}) {
  const graphRef = useRef();

  // Center on selected node
  useEffect(() => {
    if (!selectedNodeId || !graphRef.current) return;

    const node = nodes.find((n) => n.id === selectedNodeId);
    if (node) {
      graphRef.current.centerAt(node.x || 0, node.y || 0, 1000);
      graphRef.current.zoom(3, 1000);
    }
  }, [selectedNodeId, nodes]);

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={{ nodes, links: edges }}
      nodeId="id"
      linkSource="source"
      linkTarget="target"
      linkLabel={(link) => link.label}
      nodeRelSize={6}
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      onNodeClick={(node) => onNodeSelect(node.id)}
      onLinkClick={(link) => onEdgeSelect(link.id)}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = node.id === selectedNodeId ? 16 : 10;
        const radius = node.id === selectedNodeId ? 10 : 5;
        const color = node.id === selectedNodeId ? 'red' : '#1e90ff';

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(label, node.x + radius + 4, node.y);
      }}
    />
  );
}
