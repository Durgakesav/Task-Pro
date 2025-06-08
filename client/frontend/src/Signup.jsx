import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://task-pro-backend-bva5.onrender.com/signup', { email, password });
      alert('Signup successful. You can now log in.');
      navigate('/Login');
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
    <div style={styles.pageWrapper}>
      <div style={styles.overlay}></div>
      <div style={styles.centerWrapper}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Create Your Account</h2>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={styles.label}>Email Address</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label style={styles.label}>Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </Form.Group>

            <Button type="submit" style={styles.button}>
              Sign Up
            </Button>
          </Form>
        </div>
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

const styles = {
pageWrapper: {
  position: 'relative',
  height: '100vh',
  width: '100vw', // ✅ Use viewport width instead of 100%
  overflow: 'hidden',
  background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundImage: 'url("https://images.unsplash.com/photo-1521790366323-3c6b7a2f5951?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.15,
    zIndex: 0,
  },
  centerWrapper: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    padding: '40px',
    borderRadius: '14px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600',
    fontSize: '24px',
    color: '#1f2d3d',
  },
  label: {
    fontWeight: '500',
    color: '#444',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    borderRadius: '10px',
    border: '1px solid #ccc',
    padding: '12px 16px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Signup;
