const db = require("../database/db");

module.exports = {
  listar(callback) {
    db.all("SELECT * FROM tarefas", callback);
  },

  adicionar(tarefa, callback) {
    const { titulo, descricao, responsavel } = tarefa;
    db.run(
      "INSERT INTO tarefas (titulo, descricao, responsavel) VALUES (?, ?, ?)",
      [titulo, descricao, responsavel],
      callback
    );
  },

  atualizarStatus(id, status, callback) {
    db.run("UPDATE tarefas SET status = ? WHERE id = ?", [status, id], callback);
  },

  deletar(id, callback) {
    db.run("DELETE FROM tarefas WHERE id = ?", [id], callback);
  },
};
