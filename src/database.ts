import sqlite3 from 'sqlite3';

import bcrypt from 'bcrypt';
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, completed BOOLEAN)");
});

export const createTask = async (name: string, completed: boolean) => {
  return new Promise<void>((resolve, reject) => {
    db.run("INSERT INTO Task (name, completed) VALUES (?, ?)", [name, completed], function(err) {
      if (err) {
        console.error(err.message);
        return reject(err);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      resolve();
    });
  });
};

export const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    db.get("SELECT password FROM User WHERE username = ?", [username], (err, row: { password: string }) => {
      if (err) {
        console.error(err.message);
        return reject(err);
      }
      if (!row) {
        return resolve(false);
      }
      const isMatch = bcrypt.compareSync(password, row.password);
      resolve(isMatch);
    });
  });
};
export const createUser = async (username: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return new Promise<void>((resolve, reject) => {
    db.run("INSERT INTO User (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
      if (err) {
        console.error(err.message);
        return reject(err);
      }
      console.log(`A user has been inserted with rowid ${this.lastID}`);
      resolve();
    });
  });
};


export const readTasks = async (): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    db.all("SELECT * FROM Task", [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return reject(err);
      }
      resolve(rows);
    });
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
