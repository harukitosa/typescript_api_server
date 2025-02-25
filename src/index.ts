import express from 'express';

import { createTask, readTasks, updateTask, deleteTask } from './database';

const app = express();


const port = 54902;

app.use(express.json());
// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  createUser(username, password);
  res.status(201).send('User registered');
});

// User login
app.post('/login', (req, res) => {
  res.status(200).send('User logged in');
});

// User logout
app.post('/logout', (req, res) => {
  res.status(200).send('User logged out');
});


// Create a new task
app.post('/tasks', (req, res) => {
  const { name, completed } = req.body;
  createTask(name, completed);
  res.status(201).send('Task created');
});

// Read all tasks
app.get('/tasks', (req, res) => {
  readTasks((err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
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
