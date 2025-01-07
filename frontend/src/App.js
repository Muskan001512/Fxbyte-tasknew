import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/users');
        if (!response.ok) throw new Error('Error fetching users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path="/user/:id" element={<UserProfile users={users} updateUser={updateUser} />} />
      </Routes>
    </div>
  );
}

export default App;
