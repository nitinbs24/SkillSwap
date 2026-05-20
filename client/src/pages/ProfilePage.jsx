import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import SkillCard from '../components/SkillCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import '../styles/profile.css';

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  
  const [profileUser, setProfileUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes, skillsRes] = await Promise.all([
          axios.get(`/users/${id}`),
          axios.get(`/skills/user/${id}`)
        ]);
        
        setProfileUser(userRes.data);
        setSkills(skillsRes.data);
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) return <Loader />;
  if (error || !profileUser) return <div className="error-message" style={{ margin: 'var(--space-lg)' }}>{error}</div>;

  const isOwnProfile = currentUser && currentUser._id === profileUser._id;

  return (
    <div>
      <div className="profile-header">
        <img src={profileUser.profilePic} alt="avatar" className="profile-avatar" />
        <div style={{ flex: 1 }}>
          <h1 className="profile-name">{profileUser.name}</h1>
          <div className="profile-meta">
            {profileUser.college && <span>{profileUser.college}</span>}
            {profileUser.college && profileUser.year && <span> • </span>}
            {profileUser.year && <span>{profileUser.year}</span>}
          </div>
          {profileUser.bio && <p className="profile-bio">{profileUser.bio}</p>}
        </div>
        {isOwnProfile && (
          <div>
            <Link to="/edit-profile" className="btn btn-outline">Edit Profile</Link>
          </div>
        )}
      </div>

      <div style={{ marginTop: 'var(--space-xl)' }}>
        <h2 style={{ marginBottom: 'var(--space-lg)' }}>Skills Offered by {profileUser.name.split(' ')[0]}</h2>
        
        {skills.length === 0 ? (
          <EmptyState 
            message="This user hasn't listed any skills yet." 
          />
        ) : (
          <div className="skills-grid">
            {skills.map(skill => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
