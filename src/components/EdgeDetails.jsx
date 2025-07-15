// src/components/EdgeDetails.jsx

import React from 'react';

export default function EdgeDetails({ edge, fromNode, toNode }) {
  if (!edge) return <p className="text-gray-500">No connection selected.</p>;

  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold text-blue-800">
        Connection: {edge.label}
      </p>

      <p>
        <strong>From:</strong> {fromNode?.name || 'Unknown'}
      </p>
      <p>
        <strong>To:</strong> {toNode?.name || 'Unknown'}
      </p>

      <p className="text-gray-700">
        <strong>Details:</strong> {edge.details}
      </p>
    </div>
  );
}
