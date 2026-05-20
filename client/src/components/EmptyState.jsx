import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ message, actionLabel, actionLink }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: 'var(--space-xxl) var(--space-md)',
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--radius)',
      border: '1px dashed var(--border)',
      margin: 'var(--space-lg) 0'
    }}>
      <div style={{
        fontSize: '3rem',
        marginBottom: 'var(--space-md)',
        opacity: '0.5'
      }}>
        🔍
      </div>
      <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--text-muted)' }}>
        {message || 'No items found'}
      </h3>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
