import React, { useState, useEffect } from 'react';

function CadastroHorario() {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    setPacientes(JSON.parse(localStorage.getItem('pacientes')) || []);
    setMedicos(JSON.parse(localStorage.getItem('medicos')) || []);
    setAgendamentos(JSON.parse(localStorage.getItem('agendamentos')) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  }, [agendamentos]);

  const handleAgendar = (e) => {
    e.preventDefault();
    if (!pacienteSelecionado || !medicoSelecionado || !data || !horario) {
      alert('Preencha todos os campos!');
      return;
    }
    const novoAgendamento = { pacienteCpf: pacienteSelecionado, medicoId: medicoSelecionado, data, horario };
    setAgendamentos([...agendamentos, novoAgendamento]);
    setPacienteSelecionado('');
    setMedicoSelecionado('');
    setData('');
    setHorario('');
  };

  const getNomePaciente = (cpf) => {
    const paciente = pacientes.find((p) => p.cpf === cpf);
    return paciente ? `${paciente.nome} ${paciente.sobrenome}` : 'Paciente não encontrado';
  };

  const getNomeMedico = (id) => {
    const medico = medicos.find((m) => m.id === id);
    return medico ? `${medico.nome} (${medico.profissao})` : 'Médico não encontrado';
  };

  return (
    <div className="container mt-4">
      <h2>Agendamento de Consulta</h2>
      <form onSubmit={handleAgendar} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Paciente</label>
          <select className="form-select" value={pacienteSelecionado} onChange={(e) => setPacienteSelecionado(e.target.value)}>
            <option value="">Selecione um paciente</option>
            {pacientes.map((p) => (
              <option key={p.cpf} value={p.cpf}>{p.nome} {p.sobrenome}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Profissional</label>
          <select className="form-select" value={medicoSelecionado} onChange={(e) => setMedicoSelecionado(e.target.value)}>
            <option value="">Selecione um profissional</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>{m.nome} ({m.profissao})</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Data</label>
          <input type="date" className="form-control" value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Horário</label>
          <input type="time" className="form-control" value={horario} onChange={(e) => setHorario(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Agendar</button>
      </form>
      <h4>Consultas Agendadas</h4>
      {agendamentos.length === 0 ? (
        <p>Nenhuma consulta agendada.</p>
      ) : (
        <ul className="list-group">
          {agendamentos.map((ag, index) => (
            <li key={index} className="list-group-item">
              <strong>{getNomePaciente(ag.pacienteCpf)}</strong> com <strong>{getNomeMedico(ag.medicoId)}</strong> - {ag.data} às {ag.horario}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CadastroHorario;
