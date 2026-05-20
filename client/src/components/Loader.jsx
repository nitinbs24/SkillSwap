import React from 'react';

const Loader = ({ message }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-xl)',
      minHeight: '200px'
    }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid var(--primary-light)',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      {message && <p style={{ marginTop: 'var(--space-md)', color: 'var(--text-muted)' }}>{message}</p>}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
