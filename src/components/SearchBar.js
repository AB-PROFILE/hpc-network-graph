// src/components/SearchBar.jsx
import React, { useState } from 'react';

export default function SearchBar({ nodes, onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter nodes
    const filtered = value
      ? nodes.filter((n) =>
          n.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    setSuggestions(filtered);
  };

  const handleSelect = (node) => {
    setQuery(node.name);
    setSuggestions([]);
    onSelect(node.id);
  };

  return (
    <div className="relative w-full max-w-md mb-6">
      <input
        type="text"
        placeholder="Search HCP by name..."
        className="w-full px-4 py-2 border rounded shadow"
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow-md">
          {suggestions.map((node) => (
            <li
              key={node.id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(node)}
            >
              {node.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
