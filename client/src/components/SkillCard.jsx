import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

import SkillBadge from './SkillBadge';
const SkillCard = ({ skill, showControls, onEdit, onDelete }) => {
  return (
    <div className="skill-card">
      <div className="skill-card-body">
        <div className="skill-card-header">
          <Link to={`/skills/${skill._id}`} className="skill-title">{skill.title}</Link>
        </div>
        
        <div style={{ marginBottom: 'var(--space-sm)' }}>
          <SkillBadge label={skill.category} variant="category" />
          <SkillBadge label={skill.level} variant="level" />
        </div>
        
        <p className="skill-desc">{skill.description}</p>
        
        <div style={{ marginTop: 'auto' }}>
          {skill.tags && skill.tags.map((tag, idx) => (
             <SkillBadge key={idx} label={tag} variant="tag" />
          ))}
        </div>
      </div>
      
      <div className="skill-card-footer">
        {skill.owner && (
          <Link to={`/profile/${skill.owner._id}`} className="skill-owner">
            <img src={skill.owner.profilePic} alt="avatar" />
            <span>{skill.owner.name}</span>
          </Link>
        )}
        
        {showControls ? (
          <div className="skill-controls">
            <button className="icon-btn" onClick={() => onEdit(skill._id)}>✏️</button>
            <button className="icon-btn delete" onClick={() => onDelete(skill._id)}>🗑️</button>
          </div>
        ) : (
          <Link to={`/skills/${skill._id}`} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
