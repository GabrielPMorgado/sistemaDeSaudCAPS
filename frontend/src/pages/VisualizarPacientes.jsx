import React from 'react';
import './VisualizarPacientes.css'; // pode reaproveitar o CSS de profissionais

function VisualizarPacientes({ pacientes, onEditar, onApagar }) {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Pacientes Cadastrados</h2>
      <div className="table-responsive table-container">
        <table className="table table-bordered text-center tabela-customizada">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length === 0 ? (
              <tr>
                <td colSpan="6">Nenhum paciente cadastrado.</td>
              </tr>
            ) : (
              pacientes.map((paciente, index) => (
                <tr key={index}>
                  <td>{paciente.nome}</td>
                  <td>{paciente.sobrenome}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.telefone}</td>
                  <td>{paciente.dataNascimento}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onEditar(paciente)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onApagar(paciente)}
                        title="Apagar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VisualizarPacientes;
