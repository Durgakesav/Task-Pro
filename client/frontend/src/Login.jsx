import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userID', res.data.userID);

      navigate(`/TaskBoard/${res.data.userID}`);
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.error || err.message || "Login failed. Please try again.";
      alert('Login failed: ' + errorMsg);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-heading">Login</h1>
          <Form onSubmit={handleLogin} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Log In</Button>
          </Form>
        </div>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} TaskManager. All rights reserved.</p>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Login;
