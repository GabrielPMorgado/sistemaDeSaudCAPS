import medicoRepository from '../repositories/medicosRepository.js';
import { Medico } from '../models/Medico.js';

export default {
  async listar(req, res, next) {
    try {
      const medicos = await medicoRepository.findAll();
      res.json(medicos);
    } catch (error) {
      next(error);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const medico = await medicoRepository.findById(req.params.id);
      if (!medico) {
        return res.status(404).json({ message: 'Médico não encontrado' });
      }
      res.json(medico);
    } catch (error) {
      next(error);
    }
  },

  async cadastrar(req, res, next) {
    try {
      const medico = new Medico(req.body);
      const errors = medico.validate();
      
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const medicoExistente = await medicoRepository.findByCrm(medico.crm);
      if (medicoExistente) {
        return res.status(400).json({ message: 'CRM já cadastrado' });
      }

      const novoMedico = await medicoRepository.create(medico);
      res.status(201).json(novoMedico);
    } catch (error) {
      next(error);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const medicoExistente = await medicoRepository.findById(id);
      
      if (!medicoExistente) {
        return res.status(404).json({ message: 'Médico não encontrado' });
      }

      const medico = new Medico({ ...req.body, id });
      const errors = medico.validate();
      
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const medicoAtualizado = await medicoRepository.update(id, medico);
      res.json(medicoAtualizado);
    } catch (error) {
      next(error);
    }
  },

  async excluir(req, res, next) {
    try {
      const { id } = req.params;
      const medico = await medicoRepository.findById(id);
      
      if (!medico) {
        return res.status(404).json({ message: 'Médico não encontrado' });
      }

      await medicoRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};