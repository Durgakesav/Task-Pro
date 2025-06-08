import React from 'react';
import './Home.css';
import './App.css'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';

const carouselItems = [
  {
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80',
    alt: 'Team planning session',
    captionTitle: 'Organize Your Tasks',
    captionText: 'Break down your projects into manageable tasks.',
  },
  {
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1350&q=80',
    alt: 'Prioritize tasks',
    captionTitle: 'Prioritize with Ease',
    captionText: 'Focus on what matters most with smart prioritization.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1350&q=80',
    alt: 'Perform efficiently',
    captionTitle: 'Get Things Done',
    captionText: 'Track your progress and complete your goals efficiently.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleSignup = () => navigate('/Signup');
  const handleLogin = () => navigate('/Login');

  return (
    <>
      <div className="home-fullscreen">
        <div className="home-overlay">
          <div className="home-carousel-container">
            <Carousel fade controls={false} indicators={false} interval={5000} pause={false}>
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100 home-carousel-image" src={item.src} alt={item.alt} />
                  <Carousel.Caption>
                    <h3>{item.captionTitle}</h3>
                    <p>{item.captionText}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="home-content">
            <h1 className="home-title">TaskManager</h1>
            <p className="home-subtitle">Plan. Prioritize. Perform.</p>
            <div className="home-buttons">
              <Button variant="primary" size="lg" onClick={handleSignup} className="home-btn">
                Sign Up
              </Button>
              <Button variant="outline-light" size="lg" onClick={handleLogin} className="home-btn">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
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
};

export default Home;
