import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { CATEGORIES, LEVELS } from '../utils/constants';
import '../styles/skills.css';

const AddSkillPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    level: LEVELS[0],
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/skills', formData);
      navigate('/my-skills');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skills-form-container">
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Add a New Skill</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Skill Title</label>
          <input 
            type="text" 
            name="title"
            className="form-control" 
            placeholder="e.g. Introduction to React"
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
            placeholder="Describe what you will teach and what the learner can expect..."
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
            placeholder="e.g. react, frontend, web dev"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Skill'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSkillPage;
