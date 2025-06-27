const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./tarefas.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descricao TEXT,
      responsavel TEXT,
      status TEXT DEFAULT 'Pendente'
    )
  `);
});

module.exports = db;
