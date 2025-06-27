const Tarefa = require("../models/tarefa");

module.exports = {
  listar(req, res) {
    Tarefa.listar((err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    });
  },

  adicionar(req, res) {
    Tarefa.adicionar(req.body, (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ mensagem: "Tarefa adicionada com sucesso" });
    });
  },

  atualizarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    Tarefa.atualizarStatus(id, status, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: "Status atualizado com sucesso" });
    });
  },

  deletar(req, res) {
    const { id } = req.params;
    Tarefa.deletar(id, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: "Tarefa excluída com sucesso" });
    });
  },
};
