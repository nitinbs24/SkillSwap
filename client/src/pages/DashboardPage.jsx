import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import SkillCard from '../components/SkillCard';
import RequestCard from '../components/RequestCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import '../styles/dashboard.css';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [recentSkills, setRecentSkills] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [skillsRes, requestsRes] = await Promise.all([
          axios.get(`/skills/user/${user._id}`),
          axios.get('/requests/incoming')
        ]);
        
        setRecentSkills(skillsRes.data.slice(0, 3));
        setIncomingRequests(requestsRes.data.filter(r => r.status === 'pending').slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user._id]);

  const handleAccept = async (reqId) => {
    try {
      await axios.put(`/requests/${reqId}/accept`);
      setIncomingRequests(incomingRequests.filter(r => r._id !== reqId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (reqId) => {
    try {
      await axios.put(`/requests/${reqId}/decline`);
      setIncomingRequests(incomingRequests.filter(r => r._id !== reqId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="welcome-banner">
        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xs)' }}>Welcome back, {user.name.split(' ')[0]}!</h1>
        <p style={{ opacity: 0.9 }}>Ready to learn something new today?</p>
      </div>

      <div className="quick-actions">
        <Link to="/skills/add" className="action-card">
          <span className="action-icon">➕</span>
          Add a New Skill
        </Link>
        <Link to="/browse" className="action-card">
          <span className="action-icon">🔍</span>
          Browse All Skills
        </Link>
        <Link to="/requests" className="action-card">
          <span className="action-icon">📬</span>
          View My Requests
        </Link>
      </div>

      <div className="dashboard-grid" style={{ marginTop: 'var(--space-xxl)' }}>
        <div className="dashboard-main">
          <div className="section-header">
            <h3>My Recent Skills</h3>
            <Link to="/my-skills" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>View All</Link>
          </div>
          
          {recentSkills.length === 0 ? (
            <EmptyState 
              message="You haven't listed any skills yet." 
              actionLabel="Add Skill" 
              actionLink="/skills/add" 
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
              {recentSkills.map(skill => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-sidebar">
          <div className="section-header">
            <h3>Pending Requests</h3>
            <Link to="/requests" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>Inbox</Link>
          </div>

          {incomingRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl) var(--space-md)', color: 'var(--text-muted)', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              No pending requests.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {incomingRequests.map(req => (
                <RequestCard 
                  key={req._id} 
                  request={req} 
                  type="incoming" 
                  onAccept={handleAccept} 
                  onDecline={handleDecline} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
