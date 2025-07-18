const form = document.getElementById('tarefa-form');
const tabelaBody = document.querySelector('#tabela-tarefas tbody');
const resumoStatus = document.getElementById('resumo-status');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefasNoStorage() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function atualizarTabela() {
  tabelaBody.innerHTML = '';

  tarefas.forEach(tarefa => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${tarefa.titulo}</td>
      <td>${tarefa.responsavel}</td>
      <td>${tarefa.status}</td>
      <td>
        <button onclick="mudarStatus(${tarefa.id})">Mudar Status</button>
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

function atualizarResumo() {
  const pendente = tarefas.filter(t => t.status === 'Pendente').length;
  const andamento = tarefas.filter(t => t.status === 'Em Andamento').length;
  const concluida = tarefas.filter(t => t.status === 'Concluída').length;

  resumoStatus.textContent = `Pendente: ${pendente} | Em Andamento: ${andamento} | Concluída: ${concluida}`;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nomeAluno = form.nomeAluno.value.trim();
  const descricao = form.descricao.value.trim();
  const responsavel = form.responsavel.value.trim();

  if (!nomeAluno || !descricao || !responsavel) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const tarefa = {
    id: Date.now(),
    titulo: descricao,
    responsavel: responsavel,
    status: 'Pendente'
  };

  tarefas.push(tarefa);
  salvarTarefasNoStorage();
  atualizarTabela();
  atualizarResumo();

  form.reset();
  form.nomeAluno.focus();
});

window.mudarStatus = function(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  if (tarefa.status === 'Pendente') tarefa.status = 'Em Andamento';
  else if (tarefa.status === 'Em Andamento') tarefa.status = 'Concluída';
  else tarefa.status = 'Pendente';

  salvarTarefasNoStorage();
  atualizarTabela();
  atualizarResumo();
}

window.removerTarefa = function(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarTarefasNoStorage();
  atualizarTabela();
  atualizarResumo();
}

// Carregar as tarefas ao abrir a página
window.onload = function() {
  atualizarTabela();
  atualizarResumo();
}
