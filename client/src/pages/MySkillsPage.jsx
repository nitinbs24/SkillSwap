import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import SkillCard from '../components/SkillCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import '../styles/skills.css';

const MySkillsPage = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const { data } = await axios.get(`/skills/user/${user._id}`);
        setSkills(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMySkills();
  }, [user._id]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`/skills/${id}`);
        setSkills(skills.filter(skill => skill._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    // Navigate will happen via Link in the card or passing a function
    window.location.href = `/skills/edit/${id}`;
  };

  return (
    <div>
      <div className="skills-header">
        <h2>My Skills</h2>
        <Link to="/skills/add" className="btn btn-primary">➕ Add New Skill</Link>
      </div>

      {loading ? (
        <Loader />
      ) : skills.length === 0 ? (
        <EmptyState 
          message="You haven't added any skills yet." 
          actionLabel="Add Your First Skill"
          actionLink="/skills/add"
        />
      ) : (
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillCard 
              key={skill._id} 
              skill={skill} 
              showControls={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MySkillsPage;
