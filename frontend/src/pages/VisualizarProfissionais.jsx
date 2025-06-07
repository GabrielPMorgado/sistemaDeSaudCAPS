import React from 'react';
import './VisualizarPacientes.css'; // reutilizando o estilo da tabela

function VisualizarProfissionais({ profissionais, onEditar, onApagar }) {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Profissionais Cadastrados</h2>
      <div className="table-responsive table-container">
        <table className="table table-bordered text-center tabela-customizada">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Profissão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {profissionais.length === 0 ? (
              <tr>
                <td colSpan="6">Nenhum profissional cadastrado.</td>
              </tr>
            ) : (
              profissionais.map((profissional) => (
                <tr key={profissional.id || profissional.email}>
                  <td>{profissional.nome}</td>
                  <td>{profissional.sobrenome}</td>
                  <td>{profissional.email}</td>
                  <td>{profissional.telefone}</td>
                  <td>{profissional.profissao}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        className="btn-acoes btn-editar"
                        onClick={() => onEditar(profissional)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn-acoes btn-apagar"
                        onClick={() => onApagar(profissional)}
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

export default VisualizarProfissionais;
