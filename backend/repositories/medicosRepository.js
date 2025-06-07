import pool from '../config/db.js';
import { Medico } from '../models/Medico.js';

export default {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM medicos');
    return rows.map(row => new Medico(row));
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM medicos WHERE id = ?', [id]);
    return rows[0] ? new Medico(rows[0]) : null;
  },

  async findByCrm(crm) {
    const [rows] = await pool.query('SELECT * FROM medicos WHERE crm = ?', [crm]);
    return rows[0] ? new Medico(rows[0]) : null;
  },

  async create(medico) {
    const [result] = await pool.execute(
      'INSERT INTO medicos (nome, crm, especialidade, telefone, email, status) VALUES (?, ?, ?, ?, ?, ?)',
      [medico.nome, medico.crm, medico.especialidade, medico.telefone, medico.email, medico.status]
    );
    return this.findById(result.insertId);
  },

  async update(id, medico) {
    await pool.execute(
      'UPDATE medicos SET nome = ?, crm = ?, especialidade = ?, telefone = ?, email = ?, status = ? WHERE id = ?',
      [medico.nome, medico.crm, medico.especialidade, medico.telefone, medico.email, medico.status, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    await pool.execute('DELETE FROM medicos WHERE id = ?', [id]);
    return true;
  }
};