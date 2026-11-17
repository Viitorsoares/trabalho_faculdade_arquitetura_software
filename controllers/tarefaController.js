
const Tarefa = require('../models/tarefaModel');

function naoEncontrada(res) {
  return res.status(404).render('erro', {
    titulo: 'Tarefa não encontrada',
    mensagem: 'Essa tarefa não existe ou já foi excluída.'
  });
}

exports.listar = (req, res) => {
  const filtro = ['pendente', 'concluida'].includes(req.query.filtro)
    ? req.query.filtro
    : 'todas';

  res.render('index', {
    titulo: 'Minhas tarefas',
    tarefas: Tarefa.listar(filtro),
    filtro,
    totais: Tarefa.contar()
  });
};

exports.formNova = (req, res) => {
  res.render('form', {
    titulo: 'Nova tarefa',
    acao: '/tarefas',
    botao: 'Cadastrar tarefa',
    tarefa: { titulo: '', descricao: '', disciplina: '' },
    erros: {}
  });
};

exports.criar = (req, res) => {
  const dados = Tarefa.limpar(req.body);
  const erros = Tarefa.validar(dados);

  if (Object.keys(erros).length > 0) {
    return res.status(400).render('form', {
      titulo: 'Nova tarefa',
      acao: '/tarefas',
      botao: 'Cadastrar tarefa',
      tarefa: dados,
      erros
    });
  }

  Tarefa.criar(dados);
  res.redirect('/');
};

exports.detalhes = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return naoEncontrada(res);

  res.render('detalhes', { titulo: 'Detalhes da tarefa', tarefa });
};

exports.formEditar = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return naoEncontrada(res);

  res.render('form', {
    titulo: 'Editar tarefa',
    acao: `/tarefas/${tarefa.id}/editar`,
    botao: 'Salvar alterações',
    tarefa,
    erros: {}
  });
};

exports.atualizar = (req, res) => {
  const existente = Tarefa.buscarPorId(req.params.id);
  if (!existente) return naoEncontrada(res);

  const dados = Tarefa.limpar(req.body);
  const erros = Tarefa.validar(dados);

  if (Object.keys(erros).length > 0) {
    return res.status(400).render('form', {
      titulo: 'Editar tarefa',
      acao: `/tarefas/${existente.id}/editar`,
      botao: 'Salvar alterações',
      tarefa: dados,
      erros
    });
  }

  Tarefa.atualizar(existente.id, dados);
  res.redirect(`/tarefas/${existente.id}`);
};

exports.concluir = (req, res) => {
  const tarefa = Tarefa.concluir(req.params.id);
  if (!tarefa) return naoEncontrada(res);

  res.redirect(req.body.voltar === 'detalhes' ? `/tarefas/${tarefa.id}` : '/');
};

exports.confirmarExclusao = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return naoEncontrada(res);

  res.render('excluir', { titulo: 'Excluir tarefa', tarefa });
};

exports.excluir = (req, res) => {
  const removida = Tarefa.remover(req.params.id);
  if (!removida) return naoEncontrada(res);

  res.redirect('/');
};
