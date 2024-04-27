import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/signup');
    }
  }, [user, history]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    history.push('/signup');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user && (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
