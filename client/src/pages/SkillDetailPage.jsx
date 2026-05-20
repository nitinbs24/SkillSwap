import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import UserCard from '../components/UserCard';
import SkillBadge from '../components/SkillBadge';
import Modal from '../components/Modal';
import { formatDate } from '../utils/formatDate';

const SkillDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(null); // null, 'pending', 'accepted'
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    const fetchSkillAndRequest = async () => {
      try {
        const { data: skillData } = await axios.get(`/skills/${id}`);
        setSkill(skillData);

        // If logged in and not the owner, check if there's an existing request
        if (user && skillData.owner._id !== user._id) {
          const { data: outRequests } = await axios.get('/requests/outgoing');
          const existingReq = outRequests.find(r => r.skill._id === id);
          if (existingReq) {
            setRequestStatus(existingReq.status);
          }
        }
      } catch (err) {
        setError('Skill not found');
      } finally {
        setLoading(false);
      }
    };

    fetchSkillAndRequest();
  }, [id, user]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setRequestLoading(true);
    setRequestError('');

    try {
      await axios.post('/requests', { skillId: id, message });
      setRequestStatus('pending');
      setIsModalOpen(false);
    } catch (err) {
      setRequestError(err.response?.data?.message || 'Failed to send request');
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error || !skill) return <div className="error-message" style={{ margin: 'var(--space-lg)' }}>{error}</div>;

  const isOwner = user && user._id === skill.owner._id;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-lg) 0' }}>
      <div style={{
        background: 'var(--card-bg)',
        padding: 'var(--space-xl)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        marginBottom: 'var(--space-lg)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text)' }}>{skill.title}</h1>
        </div>

        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <SkillBadge label={skill.category} variant="category" />
          <SkillBadge label={skill.level} variant="level" />
        </div>

        <div style={{
          fontSize: '1.1rem',
          color: 'var(--text-muted)',
          lineHeight: '1.8',
          marginBottom: 'var(--space-xl)',
          whiteSpace: 'pre-wrap'
        }}>
          {skill.description}
        </div>

        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h4 style={{ marginBottom: 'var(--space-sm)' }}>Tags</h4>
          {skill.tags && skill.tags.length > 0 ? (
            skill.tags.map(tag => <SkillBadge key={tag} label={tag} variant="tag" />)
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>No tags provided</span>
          )}
        </div>
        
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
          Listed on {formatDate(skill.createdAt)}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-lg)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Skill Provider</h3>
          <UserCard user={skill.owner} />
        </div>
      </div>

      <div style={{
        background: 'var(--card-bg)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {!user ? (
          <p>Please <Link to="/login" style={{ fontWeight: 'bold' }}>Login</Link> to send a swap request.</p>
        ) : isOwner ? (
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <Link to={`/skills/edit/${skill._id}`} className="btn btn-outline">Edit Skill</Link>
          </div>
        ) : requestStatus === 'pending' ? (
          <div className="badge badge-pending" style={{ fontSize: '1rem', padding: '10px 20px' }}>Request Pending</div>
        ) : requestStatus === 'accepted' ? (
          <div className="badge badge-accepted" style={{ fontSize: '1rem', padding: '10px 20px' }}>Request Accepted 🎉</div>
        ) : requestStatus === 'declined' ? (
           <div className="badge badge-declined" style={{ fontSize: '1rem', padding: '10px 20px' }}>Request Declined</div>
        ) : (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Send Swap Request</button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Send Swap Request">
        <form onSubmit={handleSendRequest}>
          {requestError && <div className="error-message">{requestError}</div>}
          <div className="form-group">
            <label className="form-label">Message (Optional)</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Introduce yourself and mention what you'd like to learn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={requestLoading}>
            {requestLoading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SkillDetailPage;
