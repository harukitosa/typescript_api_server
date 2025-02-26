import request from 'supertest';
import express from 'express';
import { expect } from 'chai';

import jwt from 'jsonwebtoken';
import { createUser, authenticateUser } from '../src/database';
const app = express();
app.use(express.json());

// Mock endpoints
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  createUser(username, password);
  res.status(201).send('User registered');

});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  authenticateUser(username, password).then(isMatch => {
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in', token });
  }).catch(err => {
    res.status(500).send('Internal server error');
  });
});

app.post('/logout', (req, res) => {
  res.status(200).send('User logged out');
});

describe('Authentication API', () => {
  it('should register a user', async () => {
    const response = await request(app).post('/register').send({ username: 'testuser', password: 'testpass' });
    expect(response.status).to.equal(201);
    expect(response.text).to.equal('User registered');
  });

  it('should login a user', async () => {
    await request(app).post('/register').send({ username: 'testuser', password: 'testpass' });
    const response = await request(app).post('/login').send({ username: 'testuser', password: 'testpass' });
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('User logged in');
    expect(response.body).to.have.property('token');
  });

  it('should logout a user', async () => {
    const response = await request(app).post('/logout');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('User logged out');
  });
});
