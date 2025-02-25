import request from 'supertest';
import express from 'express';
import { expect } from 'chai';

const app = express();
app.use(express.json());

// Mock endpoints
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  createUser(username, password);
  res.status(201).send('User registered');
import { createUser } from '../src/database';
});

app.post('/login', (req, res) => {
  res.status(200).send('User logged in');
});

app.post('/logout', (req, res) => {
  res.status(200).send('User logged out');
});

describe('Authentication API', () => {
  it('should register a user', async () => {
    const response = await request(app).post('/register');
    expect(response.status).to.equal(201);
    expect(response.text).to.equal('User registered');
  });

  it('should login a user', async () => {
    const response = await request(app).post('/login');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('User logged in');
  });

  it('should logout a user', async () => {
    const response = await request(app).post('/logout');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('User logged out');
  });
});
