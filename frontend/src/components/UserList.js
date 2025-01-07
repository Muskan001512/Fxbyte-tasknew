import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      <h1 className="title">User List</h1>
      {users.length > 0 ? (
        <div className="user-cards">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
              <Link to={`/user/${user.id}`} className="user-name">
                {user.name}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users">No users found</p>
      )}
    </div>
  );
};

export default UserList;
