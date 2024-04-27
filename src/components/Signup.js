import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are mandatory');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const accessToken = generateAccessToken();

    localStorage.setItem('accessToken', accessToken);
    setUser({ ...formData, accessToken });

    history.push('/profile');
  };

  const generateAccessToken = () => {
    return uuidv4();
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
            autoComplete="new-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prevState => ({ ...prevState, confirmPassword: e.target.value }))}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn-signup">Signup</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
