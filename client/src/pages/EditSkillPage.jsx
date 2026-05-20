import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { CATEGORIES, LEVELS } from '../utils/constants';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import '../styles/skills.css';

const EditSkillPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    level: LEVELS[0],
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const { data } = await axios.get(`/skills/${id}`);
        
        // Authorization check
        if (data.owner._id !== user._id) {
          navigate('/dashboard');
          return;
        }

        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          level: data.level,
          tags: data.tags ? data.tags.join(', ') : ''
        });
      } catch (err) {
        setError('Failed to fetch skill details');
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id, user._id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await axios.put(`/skills/${id}`, formData);
      navigate('/my-skills');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update skill');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="skills-form-container">
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Edit Skill</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Skill Title</label>
          <input 
            type="text" 
            name="title"
            className="form-control" 
            value={formData.title}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea 
            name="description"
            className="form-control" 
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Proficiency Level</label>
            <select 
              name="level"
              className="form-control"
              value={formData.level}
              onChange={handleChange}
            >
              {LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Tags (comma separated)</label>
          <input 
            type="text" 
            name="tags"
            className="form-control" 
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSkillPage;
