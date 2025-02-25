import sqlite3 from 'sqlite3';

import bcrypt from 'bcrypt';
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, completed BOOLEAN)");
});

export const createTask = (name: string, completed: boolean) => {
  db.run("INSERT INTO Task (name, completed) VALUES (?, ?)", [name, completed], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
export const createUser = (username: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run("INSERT INTO User (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A user has been inserted with rowid ${this.lastID}`);
  });
};

};
export const authenticateUser = (username: string, password: string, callback: (err: Error | null, isMatch?: boolean) => void) => {
  db.get("SELECT password FROM User WHERE username = ?", [username], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (!row) {
      return callback(null, false);
    }
    const isMatch = bcrypt.compareSync(password, row.password);
    callback(null, isMatch);
  });
};

export const readTasks = (callback: (err: Error | null, rows?: any[]) => void) => {
  db.all("SELECT * FROM Task", [], (err, rows) => {
    callback(err, rows);
  });
};

export const updateTask = (id: number, completed: boolean) => {
  db.run("UPDATE Task SET completed = ? WHERE id = ?", [completed, id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
};

export const deleteTask = (id: number) => {
  db.run("DELETE FROM Task WHERE id = ?", [id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted: ${this.changes}`);
  });
};
