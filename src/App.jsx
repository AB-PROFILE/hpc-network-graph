import React, { useState } from 'react';
import { nodes as mockNodes, edges as mockEdges } from './data/mockHcpData.js';
import SearchBar from './components/SearchBar.jsx';
import NetworkGraph from './components/NetworkGraph.jsx';
import Modal from './components/Modal.jsx';

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  function closeModal() {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }

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
      <Modal isOpen={selectedNodeId !== null} onClose={closeModal} title="HCP Details">
        {(() => {
          const node = mockNodes.find((n) => n.id === selectedNodeId);
          if (!node) return <p>No details available</p>;
          return (
            <>
              <p><strong>Name:</strong> {node.name}</p>
              <p><strong>Education:</strong> {node.education}</p>
              <p><strong>Experience:</strong> {node.experience}</p>
              <p><strong>Publications:</strong> {node.publications}</p>
            </>
          );
        })()}
      </Modal>

      {/* Edge Details Modal */}
      <Modal isOpen={selectedEdgeId !== null} onClose={closeModal} title="Connection Details">
        {(() => {
          const edge = mockEdges.find((e, i) => i === selectedEdgeId);
          if (!edge) return <p>No details available</p>;
          return (
            <>
              <p><strong>Connection:</strong> {edge.label}</p>
              <p>{edge.details}</p>
            </>
          );
        })()}
      </Modal>
    </div>
  );
}
