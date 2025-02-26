import express from 'express';

import { createTask, readTasks, updateTask, deleteTask, createUser, authenticateUser } from './database';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(expressJwt({ secret: process.env.JWT_SECRET || 'secret', algorithms: ['HS256'] }).unless({ path: ['/login', '/register'] }));

const port = process.env.PORT || 54902;

app.use(express.json());
// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await createUser(username, password);
  res.status(201).send('User registered');
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const isMatch = await authenticateUser(username, password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in', token });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// User logout
app.post('/logout', (req, res) => {
  res.status(200).send('User logged out');
});


// Create a new task
app.post('/tasks', async (req, res) => {
  const { name, completed } = req.body;
  await createTask(name, completed);
  res.status(201).send('Task created');
});

// Read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const rows = await readTasks();
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  updateTask(parseInt(id), completed);
  res.send('Task updated');
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  deleteTask(parseInt(id));
  res.send('Task deleted');
});
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});
