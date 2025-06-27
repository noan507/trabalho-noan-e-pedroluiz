const express = require("express");
const cors = require("cors");
const app = express();
const rotas = require("./routes/tarefaRoutes");

app.use(cors());
app.use(express.json());
app.use(rotas);

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
