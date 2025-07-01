import React, { useState } from 'react';
import { nodes as mockNodes, edges as mockEdges } from './data/mockHcpData.js';
import SearchBar from './components/SearchBar.jsx';
import NetworkGraph from './components/NetworkGraph.jsx';
import Modal from './components/Modal.jsx';
import NodeDetails from './components/NodeDetails.jsx';
import EdgeDetails from './components/EdgeDetails.jsx';

export default function App() {
  const [expandedNodeIds, setExpandedNodeIds] = useState([]);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  function closeModal() {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }

  function handleNodeSelect(nodeId) {
    setExpandedNodeIds((prev) =>
      prev.includes(nodeId) ? prev : [...prev, nodeId]
    );
    setSelectedEdgeId(null);
  }

  console.log('Nodes:', mockNodes);
  console.log('Edges:', mockEdges);
  console.log('Selected Node ID:', selectedNodeId);
  console.log('Selected Edge ID:', selectedEdgeId);

  return (
    <div className="container mx-auto p-4">
      <SearchBar nodes={mockNodes} onSelect={setSelectedNodeId} />

      <NetworkGraph
        nodes={mockNodes}
        edges={mockEdges}
        selectedNodeId={selectedNodeId}
        onNodeSelect={(id) => {
          setSelectedNodeId(id);
          setSelectedEdgeId(null);
        }}
        onEdgeSelect={(id) => {
          setSelectedEdgeId(id);
          setSelectedNodeId(null);
        }}
      />

      {/* Node Details Modal */}
      <Modal
        isOpen={selectedNodeId !== null}
        onClose={closeModal}
        title="HCP Details"
      >
        {(() => {
          const node = mockNodes.find((n) => n.id === selectedNodeId);
          return node ? <NodeDetails node={node} /> : <p>Loading HCP...</p>;
        })()}
      </Modal>

      {/* Edge Details Modal */}
      <Modal
        isOpen={selectedEdgeId !== null}
        onClose={closeModal}
        title="Connection Details"
      >
        {(() => {
          const edge = mockEdges[selectedEdgeId];
          if (!edge) return <p>No connection selected.</p>;
          const fromNode = mockNodes.find((n) => n.id === edge.from);
          const toNode = mockNodes.find((n) => n.id === edge.to);
          return <EdgeDetails edge={edge} fromNode={fromNode} toNode={toNode} />;
        })()}
      </Modal>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => {
          setExpandedNodeIds([]);
          setSelectedEdgeId(null);
          setSelectedNodeId(null);
        }}
      >
        Collapse All
      </button>
    </div>
  );
}
