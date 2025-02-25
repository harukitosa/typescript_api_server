import express from 'express';

import sqlite3 from 'sqlite3';
const app = express();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE greetings (message TEXT)");

  const stmt = db.prepare("INSERT INTO greetings VALUES (?)");
  stmt.run("Hello, World!");
  stmt.finalize();

  db.each("SELECT rowid AS id, message FROM greetings", (err, row) => {
    console.log(row.id + ": " + row.message);
  });
});

db.close();
const port = 54902;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});