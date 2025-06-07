import pool from '../config/db.js';
import { Paciente } from '../models/Paciente.js';

export default {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, m.nome as medico_nome 
      FROM pacientes p
      LEFT JOIN medicos m ON p.medico_id = m.id
    `);
    return rows.map(row => new Paciente(row));
  },

  async findById(id) {
    const [rows] = await pool.query(`
      SELECT p.*, m.nome as medico_nome 
      FROM pacientes p
      LEFT JOIN medicos m ON p.medico_id = m.id
      WHERE p.id = ?
    `, [id]);
    return rows[0] ? new Paciente(rows[0]) : null;
  },

  async findByCpf(cpf) {
    const [rows] = await pool.query('SELECT * FROM pacientes WHERE cpf = ?', [cpf]);
    return rows[0] ? new Paciente(rows[0]) : null;
  },

  async create(paciente) {
    const [result] = await pool.execute(
      'INSERT INTO pacientes (nome, cpf, telefone, email, data_nascimento, status, medico_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [paciente.nome, paciente.cpf, paciente.telefone, paciente.email, paciente.data_nascimento, paciente.status, paciente.medico_id]
    );
    return this.findById(result.insertId);
  },

  async update(id, paciente) {
    await pool.execute(
      'UPDATE pacientes SET nome = ?, cpf = ?, telefone = ?, email = ?, data_nascimento = ?, status = ?, medico_id = ? WHERE id = ?',
      [paciente.nome, paciente.cpf, paciente.telefone, paciente.email, paciente.data_nascimento, paciente.status, paciente.medico_id, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    await pool.execute('DELETE FROM pacientes WHERE id = ?', [id]);
    return true;
  }
};