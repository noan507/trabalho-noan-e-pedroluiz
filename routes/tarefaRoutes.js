const express = require("express");
const router = express.Router();
const controller = require("../controllers/tarefaController");

router.get("/tarefas", controller.listar);
router.post("/tarefas", controller.adicionar);
router.put("/tarefas/:id/status", controller.atualizarStatus);
router.delete("/tarefas/:id", controller.deletar);

module.exports = router;
