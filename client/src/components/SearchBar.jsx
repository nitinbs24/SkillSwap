import React, { useState, useEffect } from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onChange]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <span style={{ 
        position: 'absolute', 
        left: '12px', 
        top: '50%', 
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)'
      }}>
        🔍
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Search...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ paddingLeft: '40px', borderRadius: '20px' }}
      />
    </div>
  );
};

export default SearchBar;
