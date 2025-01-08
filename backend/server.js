const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./middleware/logger');
const userRoutes = require('./routes/users');

const app = express();
const port = 3002;

// Use built-in middleware directly
app.use(cors());
app.use(bodyParser.json());

// Use custom middleware
app.use(logger);

// Routes
app.use('/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
