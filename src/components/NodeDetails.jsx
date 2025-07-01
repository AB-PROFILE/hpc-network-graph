// src/components/NodeDetails.jsx

import React from 'react';

export default function NodeDetails({ node }) {
  if (!node) return <p className="text-gray-500">No HCP selected.</p>;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-blue-800">{node.name}</h3>

      <div>
        <p>
          <strong>Education:</strong> {node.education || 'N/A'}
        </p>
        <p>
          <strong>Experience:</strong> {node.experience || 'N/A'}
        </p>
        <p>
          <strong>Publications:</strong> {node.publications || 'N/A'}
        </p>
      </div>
    </div>
  );
}
