import React, { useState } from 'react';

export default function SearchBar({ nodes, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const filtered = nodes.filter((node) =>
        node.name.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search HCP by name..."
        value={query}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        aria-label="Search healthcare professional"
      />
      {results.length > 0 && (
        <ul className="border mt-1 rounded max-h-40 overflow-auto bg-white">
          {results.map((node) => (
            <li
              key={node.id}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onSelect(node.id);
                setQuery('');
                setResults([]);
              }}
            >
              {node.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
