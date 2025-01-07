const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

// Middleware for parsing JSON and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Dummy data for in-memory storage
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://via.placeholder.com/150' },
];

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer dummy-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


// Fetch user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});


// Update user information
app.put('/users/:id', authenticate, (req, res) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


