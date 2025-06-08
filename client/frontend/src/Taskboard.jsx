import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './'

const Taskboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameOfTask, setNameOfTask] = useState('');
  const [work, setWork] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskWork, setEditTaskWork] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/Login');
      return;
    }
    fetchTasks();
    fetchUserProfile();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/gettasksofuser/${id}`, {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if (err.response?.status === 401 || err.response?.status === 400) {
        localStorage.clear();
        navigate('/Login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/getProfile/${id}`);
      setProfilePic(res.data.profile);
    } catch (err) {
      console.error("Failed to load profile pic:", err);
    }
  };

  const handleUploadPic = async () => {
    if (!selectedFile) return alert("Please select a file first");

    const formData = new FormData();
    formData.append('profilePic', selectedFile);

    try {
      await axios.post(`http://localhost:5000/api/uploadProfilepic/${id}`, formData);
      await fetchUserProfile();
      alert('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed!');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!nameOfTask || !work) return alert('Fill all fields');

    try {
      await axios.post(`http://localhost:5000/api/addtasks/${id}`, {
        nameOfTask,
        work
      }, {
        headers: { Authorization: token }
      });
      setNameOfTask('');
      setWork('');
      fetchTasks();
    } catch (err) {
      console.error('Add Task Error:', err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletetasks/${taskId}`, {
        headers: { Authorization: token }
      });
      fetchTasks();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const openEditModal = (task) => {
    setEditTaskId(task._id);
    setEditTaskName(task.nameOfTask);
    setEditTaskWork(task.work);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updatework/${editTaskId}`, {
        nameOfTask: editTaskName,
        work: editTaskWork
      }, {
        headers: { Authorization: token }
      });
      setEditModal(false);
      fetchTasks();
    } catch (err) {
      console.error('Update Error:', err);
    }
  };

  const logOuthandler = () => {
    localStorage.clear();
    navigate('/Home');
  };

  if (loading) return <p style={{textAlign: 'center', marginTop: '40px', fontSize: '18px', color: '#555'}}>Loading tasks...</p>;

  return (
    <>
    <div className="page-container">
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: 30,
        display: 'flex',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: 850,
          backgroundColor: '#fff',
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#222', margin: 0 }}>Task Board</h2>
          <button
            onClick={logOuthandler}
            style={{
              border: '2px solid #dc3545',
              backgroundColor: 'transparent',
              color: '#dc3545',
              fontWeight: '600',
              padding: '6px 16px',
              borderRadius: 5,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#dc3545';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#dc3545';
            }}
          >
            Logout
          </button>
        </div>

        {/* Profile Picture Upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ flex: 1, padding: 6, borderRadius: 5, border: '1px solid #ccc' }}
          />
          <button
            onClick={handleUploadPic}
            style={{
              backgroundColor: '#28a745',
              border: 'none',
              color: '#fff',
              padding: '8px 18px',
              borderRadius: 5,
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#218838')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
            Upload
          </button>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '2px solid #28a745',
              overflow: 'hidden',
              backgroundColor: '#eee',
              flexShrink: 0,
            }}
          >
            {profilePic ? (
              <img
                src={`http://localhost:5000/${profilePic}`}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : null}
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: 10 }}>
          <input
            placeholder="Task Name"
            value={nameOfTask}
            onChange={(e) => setNameOfTask(e.target.value)}
            style={{
              flex: 3,
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 14,
            }}
          />
          <input
            placeholder="Work Description"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            style={{
              flex: 4,
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: '#007bff',
              border: 'none',
              color: 'white',
              fontWeight: '600',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Add Task
          </button>
        </form>

        {/* Task List Header */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '6px 6px 0 0',
            fontWeight: '700',
            fontSize: 14,
          }}
        >
          <div style={{ flex: 3, textAlign: 'center' }}>Task Name</div>
          <div style={{ flex: 4, textAlign: 'center' }}>Work Description</div>
          <div style={{ flex: 3, textAlign: 'center' }}>Created</div>
          <div style={{ flex: 2, textAlign: 'center' }}>Actions</div>
        </div>

        {/* Task List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tasks.map(task => (
            <div
              key={task._id}
              style={{
                display: 'flex',
                backgroundColor: '#f9f9f9',
                padding: '10px 16px',
                borderRadius: 6,
                alignItems: 'center',
                fontSize: 14,
                color: '#333',
              }}
            >
              <div style={{ flex: 3, textAlign: 'center', wordBreak: 'break-word' }}>{task.nameOfTask}</div>
              <div style={{ flex: 4, textAlign: 'center', wordBreak: 'break-word' }}>{task.work}</div>
              <div style={{ flex: 3, textAlign: 'center' }}>{new Date(task.time).toLocaleString()}</div>
              <div
                style={{
                  flex: 2,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <button
                  onClick={() => openEditModal(task)}
                  style={{
                    backgroundColor: '#ffc107',
                    border: 'none',
                    color: '#212529',
                    padding: '6px 12px',
                    borderRadius: 5,
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e0a800')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#ffc107')}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{
                    backgroundColor: '#dc3545',
                    border: 'none',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: 5,
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#bb2d3b')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
            onClick={() => setEditModal(false)}
          >
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 20,
                width: 400,
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0, marginBottom: 15 }}>Edit Task</h3>
              <input
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
                style={{
                  width: '100%',
                  padding: 10,
                  marginBottom: 15,
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: 14,
                }}
              />
              <input
                value={editTaskWork}
                onChange={(e) => setEditTaskWork(e.target.value)}
                style={{
                  width: '100%',
                  padding: 10,
                  marginBottom: 20,
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: 14,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  onClick={() => setEditModal(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '1px solid #6c757d',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
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
</div>
    </>
  );
};

export default Taskboard;
