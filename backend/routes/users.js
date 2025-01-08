const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Dummy data for in-memory storage
let users = [
  { id: 1, name: 'John Doe', email: 'john@gmail.com', avatar: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Smith Jake', email: 'smith@gmail.com', avatar: 'https://via.placeholder.com/150' },
];

// Fetch all users
router.get('/', (req, res) => {
  res.json(users);
});

// Fetch user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update user information
router.put('/:id', authenticate, (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, avatar } = req.body;
  const user = users.find((u) => u.id === userId);

  if (user) {
    user.name = name;
    user.email = email;
    user.avatar = avatar;
    res.json({ message: 'User updated successfully', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
