import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--primary)', marginBottom: 'var(--space-md)' }}>404</h1>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-xl)', maxWidth: '400px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
