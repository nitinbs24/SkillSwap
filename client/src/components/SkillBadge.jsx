import React from 'react';
import '../styles/components.css';

const SkillBadge = ({ label, variant }) => {
  let bgColor = 'var(--bg)';
  let color = 'var(--text)';

  if (variant === 'category') {
    bgColor = 'var(--primary-light)';
    color = 'var(--primary-dark)';
  } else if (variant === 'level') {
    bgColor = '#e0f7fa';
    color = '#006064';
  } else if (variant === 'tag') {
    bgColor = '#f5f5f5';
    color = '#616161';
  }

  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
      backgroundColor: bgColor,
      color: color,
      marginRight: '4px',
      marginBottom: '4px'
    }}>
      {label}
    </span>
  );
};

export default SkillBadge;
