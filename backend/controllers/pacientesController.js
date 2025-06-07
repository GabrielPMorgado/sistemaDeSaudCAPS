import pacienteRepository from '../repositories/pacientesRepository.js';
import { Paciente } from '../models/Paciente.js';

export default {
  async listar(req, res, next) {
    try {
      const pacientes = await pacienteRepository.findAll();
      res.json(pacientes);
    } catch (error) {
      next(error);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const paciente = await pacienteRepository.findById(req.params.id);
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      next(error);
    }
  },

  async cadastrar(req, res, next) {
    try {
      const paciente = new Paciente(req.body);
      const errors = paciente.validate();
      
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const pacienteExistente = await pacienteRepository.findByCpf(paciente.cpf);
      if (pacienteExistente) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
      }

      const novoPaciente = await pacienteRepository.create(paciente);
      res.status(201).json(novoPaciente);
    } catch (error) {
      next(error);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const pacienteExistente = await pacienteRepository.findById(id);
      
      if (!pacienteExistente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      const paciente = new Paciente({ ...req.body, id });
      const errors = paciente.validate();
      
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const pacienteAtualizado = await pacienteRepository.update(id, paciente);
      res.json(pacienteAtualizado);
    } catch (error) {
      next(error);
    }
  },

  async excluir(req, res, next) {
    try {
      const { id } = req.params;
      const paciente = await pacienteRepository.findById(id);
      
      if (!paciente) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      await pacienteRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};