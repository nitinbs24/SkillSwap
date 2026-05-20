import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const EditProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    college: '',
    year: '',
    profilePic: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        college: user.college || '',
        year: user.year || '',
        profilePic: user.profilePic || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.put('/users/me', formData);
      updateUser(data); // update context
      navigate(`/profile/${user._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', padding: 'var(--space-xl)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Edit Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            name="name"
            className="form-control" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea 
            name="bio"
            className="form-control" 
            rows="4"
            placeholder="Tell others a bit about yourself..."
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label className="form-label">College / University</label>
          <input 
            type="text" 
            name="college"
            className="form-control" 
            value={formData.college}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Year of Study</label>
          <select 
            name="year"
            className="form-control"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Final Year">Final Year</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Profile Picture URL</label>
          <input 
            type="text" 
            name="profilePic"
            className="form-control" 
            placeholder="https://example.com/avatar.jpg"
            value={formData.profilePic}
            onChange={handleChange}
          />
          <small style={{ color: 'var(--text-muted)' }}>Provide a direct link to an image.</small>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
