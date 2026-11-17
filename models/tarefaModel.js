
const STATUS = {
  PENDENTE: 'pendente',
  CONCLUIDA: 'concluida'
};

// "Banco de dados" em memória
const tarefas = [];
let proximoId = 1;

function validar({ titulo, descricao, disciplina }) {
  const erros = {};

  if (titulo.length < 3 || titulo.length > 100) {
    erros.titulo = 'O título é obrigatório e deve ter entre 3 e 100 caracteres.';
  }
  if (descricao.length > 500) {
    erros.descricao = 'A descrição pode ter no máximo 500 caracteres.';
  }
  if (disciplina.length < 2 || disciplina.length > 80) {
    erros.disciplina = 'A disciplina é obrigatória e deve ter entre 2 e 80 caracteres.';
  }

  return erros;
}

function limpar(dados = {}) {
  return {
    titulo: String(dados.titulo || '').trim(),
    descricao: String(dados.descricao || '').trim(),
    disciplina: String(dados.disciplina || '').trim()
  };
}

function listar(filtro) {
  if (filtro === STATUS.PENDENTE || filtro === STATUS.CONCLUIDA) {
    return tarefas.filter((t) => t.status === filtro);
  }
  return [...tarefas];
}

function contar() {
  return {
    todas: tarefas.length,
    pendentes: tarefas.filter((t) => t.status === STATUS.PENDENTE).length,
    concluidas: tarefas.filter((t) => t.status === STATUS.CONCLUIDA).length
  };
}

function buscarPorId(id) {
  return tarefas.find((t) => t.id === Number(id)) || null;
}

function criar(dados) {
  const tarefa = {
    id: proximoId++,
    ...limpar(dados),
    status: STATUS.PENDENTE
  };
  tarefas.push(tarefa);
  return tarefa;
}

function atualizar(id, dados) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  Object.assign(tarefa, limpar(dados));
  return tarefa;
}

function concluir(id) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  tarefa.status = STATUS.CONCLUIDA;
  return tarefa;
}

function remover(id) {
  const indice = tarefas.findIndex((t) => t.id === Number(id));
  if (indice === -1) return false;
  tarefas.splice(indice, 1);
  return true;
}

module.exports = {
  STATUS,
  limpar,
  validar,
  listar,
  contar,
  buscarPorId,
  criar,
  atualizar,
  concluir,
  remover
};
