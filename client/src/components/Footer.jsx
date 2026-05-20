import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--card-bg)',
      borderTop: '1px solid var(--border)',
      padding: 'var(--space-lg) var(--space-md)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
          <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-xs)' }}>SkillsSwap</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Learn. Teach. Swap Skills.</p>
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Made for FSD Subject Demo</p>
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        marginTop: 'var(--space-lg)',
        paddingTop: 'var(--space-md)',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontSize: '0.8rem'
      }}>
        &copy; {new Date().getFullYear()} SkillsSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
