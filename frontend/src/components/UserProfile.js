import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const UserProfile = ({ users, updateUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', avatar: '' });
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit modes
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = users.find((u) => u.id === parseInt(id));
    if (userData) {
      setUser(userData);
      setFormData({ name: userData.name, email: userData.email, avatar: userData.avatar });
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3002/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer dummy-token',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setSuccessMessage('User updated successfully');
        updateUser(updatedUser.user); // Notify parent
        setUser(updatedUser.user);
        setIsEditing(false); // Exit editing mode
      } else {
        throw new Error('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h1 className="title">User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Avatar URL:</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn">Save</button>
          <button type="button" className="btn cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="profile-view">
          <img src={user.avatar} alt="Avatar" className="profile-avatar" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Avatar URL:</strong> {user.avatar}</p>
          <button onClick={() => setIsEditing(true)} className="btn edit-btn">Edit</button>
        </div>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button onClick={() => navigate('/')} className="btn back-btn">Back to User List</button>
    </div>
  );
};

export default UserProfile;
