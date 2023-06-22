import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make the API call to log in
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          nickname,
          email,
          password,
          role,
        }),
      });

      if (response.ok) {
        // Successful login, redirect to the profile page
        navigate(`/profile/${id}`);
      } else {
        // Handle error response
        const data = await response.json();
        // Display an alert with the error message
        alert(data.message || 'Something went wrong with the data');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error:', error);
      // Display a generic error message
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-screen-desktop">
      <div className="div">
        <h1 className="reading essence">
          reading
          <br />
          essence
        </h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="signup-link">
          <span>You don't have an account?</span>
          <span className="signup-link-text" onClick={() => navigate('register')}>SignUp</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

