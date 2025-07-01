import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar({ nodes, onSelect }) {
  const [query, setQuery] = useState('');
  const [filteredNodes, setFilteredNodes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredNodes([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const matches = nodes.filter((node) =>
      node.name.toLowerCase().includes(lowerQuery)
    );
    setFilteredNodes(matches.slice(0, 5));
  }, [query, nodes]);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFilteredNodes([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <input
        type="search"
        className="
          w-full
          border
          border-gray-300
          rounded-md
          px-4
          py-2
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition
          duration-200
          placeholder-gray-400
        "
        placeholder="Search HCP by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search healthcare professional by name"
      />
      {filteredNodes.length > 0 && (
        <ul
          className="
            absolute
            left-0
            right-0
            bg-white
            border
            border-gray-300
            rounded-md
            shadow-lg
            mt-1
            max-h-60
            overflow-auto
            z-50
            scrollbar-thin
            scrollbar-thumb-gray-300
            scrollbar-track-gray-100
          "
          role="listbox"
          aria-label="Search suggestions"
        >
          {filteredNodes.map((node) => (
            <li
              key={node.id}
              className="
                px-4
                py-2
                cursor-pointer
                hover:bg-blue-100
                focus:bg-blue-100
                focus:outline-none
                transition
                duration-150
              "
              onClick={() => {
                onSelect(node.id);
                setQuery('');
                setFilteredNodes([]);
              }}
              role="option"
              tabIndex={0}
            >
              {highlightMatch(node.name, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Helper: highlights matched text in blue bold
function highlightMatch(name, query) {
  const regex = new RegExp(`(${query})`, 'i');
  const parts = name.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <strong key={i} className="text-blue-600 font-semibold">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
