import React from 'react';
import { CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ selected, onChange }) => {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-sm)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-md)'
    }}>
      <button 
        onClick={() => onChange('All')}
        className={`btn ${selected === 'All' ? 'btn-primary' : 'btn-outline'}`}
        style={{ padding: '6px 16px', borderRadius: '20px' }}
      >
        All
      </button>
      {CATEGORIES.map(cat => (
        <button 
          key={cat}
          onClick={() => onChange(cat)}
          className={`btn ${selected === cat ? 'btn-primary' : 'btn-outline'}`}
          style={{ padding: '6px 16px', borderRadius: '20px' }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
