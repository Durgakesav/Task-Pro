// App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Taskboard from './Taskboard';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';

function RootRedirect() {
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token && userID) {
      setRedirectPath(`/TaskBoard/${userID}`);
    } else {
      setRedirectPath('/Home');
    }
  }, []);

  if (redirectPath === null) return <p>Checking authentication...</p>;
  return <Navigate to={redirectPath} />;
}

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Taskboard/:id" element={<Taskboard />} />
      </Routes>
    </Router>

    
    </>
  );
}

export default App;
