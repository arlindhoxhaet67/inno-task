/*
Filename: ComplexWebApp.js
Content: A complex web application that performs various tasks including user authentication, data manipulation, and API integration.
*/

// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Initializing the Express framework
const app = express();
app.use(bodyParser.json());

// Database connection setup
const db = {
  users: [],
  products: [],
  orders: []
};

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword
    };

    db.users.push(user);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = db.users.find((u) => u.username === username);

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password!' });
    }

    const token = jwt.sign({ userId: user.id }, 'jwt secret key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route example
app.get('/api/profile', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'jwt secret key');
    const userId = decodedToken.userId;
    const user = db.users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized Access' });
  }
});

// API integration example
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=your-api-key');
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// ... Add more code as per your complex web application requirements