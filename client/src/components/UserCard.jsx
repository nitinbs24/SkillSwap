import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 'var(--space-md)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)'
    }}>
      <img 
        src={user.profilePic} 
        alt={user.name} 
        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} 
      />
      <div>
        <Link to={`/profile/${user._id}`} style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--text)' }}>
          {user.name}
        </Link>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {user.college && <span>{user.college} </span>}
          {user.year && <span>• {user.year}</span>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
