import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import RequestCard from '../components/RequestCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import '../styles/requests.css';

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' or 'outgoing'
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const [incomingRes, outgoingRes] = await Promise.all([
          axios.get('/requests/incoming'),
          axios.get('/requests/outgoing')
        ]);
        
        setIncomingRequests(incomingRes.data);
        setOutgoingRequests(outgoingRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (reqId) => {
    try {
      await axios.put(`/requests/${reqId}/accept`);
      setIncomingRequests(incomingRequests.map(req => 
        req._id === reqId ? { ...req, status: 'accepted' } : req
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (reqId) => {
    try {
      await axios.put(`/requests/${reqId}/decline`);
      setIncomingRequests(incomingRequests.map(req => 
        req._id === reqId ? { ...req, status: 'declined' } : req
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (reqId) => {
    try {
      await axios.delete(`/requests/${reqId}`);
      setOutgoingRequests(outgoingRequests.filter(req => req._id !== reqId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  const currentRequests = activeTab === 'incoming' ? incomingRequests : outgoingRequests;

  return (
    <div>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Swap Requests</h2>

      <div className="requests-tabs">
        <button 
          className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('incoming')}
        >
          Incoming Requests ({incomingRequests.filter(r => r.status === 'pending').length} Pending)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('outgoing')}
        >
          Sent Requests
        </button>
      </div>

      <div className="requests-list">
        {currentRequests.length === 0 ? (
          <EmptyState 
            message={`No ${activeTab} requests found.`} 
          />
        ) : (
          currentRequests.map(req => (
            <RequestCard 
              key={req._id}
              request={req}
              type={activeTab}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onCancel={handleCancel}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
