import express from 'express';

const app = express();
const port = 54902;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});