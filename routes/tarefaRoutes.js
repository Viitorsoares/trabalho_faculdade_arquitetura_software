
const express = require('express');
const controller = require('../controllers/tarefaController');

const router = express.Router();

router.get('/', controller.listar);

router.get('/tarefas/nova', controller.formNova);
router.post('/tarefas', controller.criar);

router.get('/tarefas/:id', controller.detalhes);

router.get('/tarefas/:id/editar', controller.formEditar);
router.post('/tarefas/:id/editar', controller.atualizar);

router.post('/tarefas/:id/concluir', controller.concluir);

router.get('/tarefas/:id/excluir', controller.confirmarExclusao);
router.post('/tarefas/:id/excluir', controller.excluir);

module.exports = router;
