import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Skills<span>Swap</span>
        </Link>

        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/browse" className={`nav-links ${isActive('/browse')}`} onClick={() => setMenuOpen(false)}>
              Browse Skills
            </Link>
          </li>
          
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className={`nav-links ${isActive('/dashboard')}`} onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-skills" className={`nav-links ${isActive('/my-skills')}`} onClick={() => setMenuOpen(false)}>
                  My Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/requests" className={`nav-links ${isActive('/requests')}`} onClick={() => setMenuOpen(false)}>
                  Requests
                </Link>
              </li>
              <li className="nav-item user-profile">
                <div className="profile-trigger">
                  <img src={user.profilePic} alt="avatar" className="nav-avatar" />
                  <span>{user.name}</span>
                </div>
                <div className="dropdown-menu">
                  <Link to={`/profile/${user._id}`} className="dropdown-link" onClick={() => setMenuOpen(false)}>My Profile</Link>
                  <Link to="/edit-profile" className="dropdown-link" onClick={() => setMenuOpen(false)}>Edit Profile</Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-link logout-btn">Logout</button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
