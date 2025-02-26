import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import { createTask, readTasks, updateTask, deleteTask } from '../src/database';
import jwtMiddleware from '../src/middleware/jwtMiddleware';

const app = express();
app.use(express.json());
app.use(jwtMiddleware);

// Mock endpoints
app.post('/tasks', (req, res) => {
  const { name, completed } = req.body;
  createTask(name, completed);
  res.status(201).send('Task created');
});

app.get('/tasks', (req, res) => {
  readTasks().then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  updateTask(parseInt(id), completed);
  res.send('Task updated');
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  deleteTask(parseInt(id));
  res.send('Task deleted');
});

const token = jwt.sign({ username: 'testuser' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

// Tests for task CRUD endpoints

describe('Task CRUD Endpoints Authentication', () => {
  it('should not allow access to create task without token', async () => {
    const response = await request(app).post('/tasks').send({ name: 'New Task', completed: false });
    expect(response.status).to.equal(401);
  });

  it('should not allow access to read tasks without token', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).to.equal(401);
  });

  it('should not allow access to update task without token', async () => {
    const response = await request(app).put('/tasks/1').send({ completed: true });
    expect(response.status).to.equal(401);
  });

  it('should not allow access to delete task without token', async () => {
    const response = await request(app).delete('/tasks/1');
    expect(response.status).to.equal(401);
  });

  it('should allow access to create task with token', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Task', completed: false });
    expect(response.status).to.equal(201);
  });

  it('should allow access to read tasks with token', async () => {
    const response = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
  });

  it('should allow access to update task with token', async () => {
    const response = await request(app)
      .put('/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true });
    expect(response.status).to.equal(200);
  });

  it('should allow access to delete task with token', async () => {
    const response = await request(app)
      .delete('/tasks/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
  });
});
