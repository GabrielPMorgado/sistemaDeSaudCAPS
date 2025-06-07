import express from 'express';
import medicosController from '../controllers/medicosController.js';

const router = express.Router();

router.get('/', medicosController.listar);
router.get('/:id', medicosController.buscarPorId);
router.post('/', medicosController.cadastrar);
router.put('/:id', medicosController.atualizar);
router.delete('/:id', medicosController.excluir);

export default router;