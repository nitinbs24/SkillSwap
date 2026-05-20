import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import SkillCard from '../components/SkillCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { LEVELS } from '../utils/constants';
import '../styles/browse.css';

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialLevel = searchParams.get('level') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState(initialLevel);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== 'All') params.append('category', category);
        if (level !== 'All') params.append('level', level);
        if (search) params.append('search', search);

        // Update URL
        setSearchParams(params);

        const { data } = await axios.get(`/skills?${params.toString()}`);
        setSkills(data);
      } catch (err) {
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [category, level, search, setSearchParams]);

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h2>Browse Skills</h2>
      </div>

      <div className="filters-panel">
        <CategoryFilter selected={category} onChange={setCategory} />
        
        <div className="filter-row">
          <SearchBar value={search} onChange={setSearch} placeholder="Search skills, tags..." />
          
          <select 
            className="form-control" 
            style={{ width: 'auto', borderRadius: '20px' }}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="All">All Levels</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loader />
      ) : skills.length === 0 ? (
        <EmptyState 
          message="No skills found matching your filters." 
          actionLabel="Clear Filters"
          actionLink="/browse"
          onClick={() => { setCategory('All'); setLevel('All'); setSearch(''); }}
        />
      ) : (
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
