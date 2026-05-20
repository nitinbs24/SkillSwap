import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import '../styles/components.css';

const RequestCard = ({ request, type, onAccept, onDecline, onCancel }) => {
  const otherUser = type === 'incoming' ? request.requester : request.provider;

  return (
    <div className="request-card">
      <div className="request-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <Link to={`/skills/${request.skill._id}`} className="request-skill-title">
              {request.skill.title}
            </Link>
            <div className="request-meta">
              <img src={otherUser.profilePic} alt="avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
              <Link to={`/profile/${otherUser._id}`} style={{ color: 'var(--text)', fontWeight: '500' }}>
                {otherUser.name}
              </Link>
              <span style={{ color: 'var(--text-muted)' }}>• {formatDate(request.createdAt)}</span>
            </div>
          </div>
          <span className={`badge badge-${request.status}`}>{request.status}</span>
        </div>
        
        {request.message && (
          <div className="request-message">"{request.message}"</div>
        )}
      </div>

      <div className="request-actions">
        {request.status === 'pending' && type === 'incoming' && (
          <>
            <button className="btn btn-success" onClick={() => onAccept(request._id)}>Accept</button>
            <button className="btn btn-danger" onClick={() => onDecline(request._id)}>Decline</button>
          </>
        )}
        
        {request.status === 'pending' && type === 'outgoing' && (
          <button className="btn btn-outline" onClick={() => onCancel(request._id)}>Cancel</button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
