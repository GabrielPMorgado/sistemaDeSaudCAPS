import express from 'express';
import pacientesController from '../controllers/pacientesController.js';

const router = express.Router();

router.get('/', pacientesController.listar);
router.get('/:id', pacientesController.buscarPorId);
router.post('/', pacientesController.cadastrar);
router.put('/:id', pacientesController.atualizar);
router.delete('/:id', pacientesController.excluir);

export default router;