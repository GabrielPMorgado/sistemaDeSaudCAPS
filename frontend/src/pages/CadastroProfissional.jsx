import React, { useState } from 'react';
import './CadastroPaciente.css';

function CadastroProfissional({ adicionarProfissional }) {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    profissao: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarTelefone = (tel) => /^\d{10,11}$/.test(tel.replace(/\D/g, ''));

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!formData.sobrenome.trim()) newErrors.sobrenome = 'Sobrenome é obrigatório.';

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!validarEmail(formData.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else if (!validarTelefone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido. Use 10 ou 11 dígitos.';
    }

    if (!formData.profissao) {
      newErrors.profissao = 'Selecione a profissão.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      adicionarProfissional(formData);
      alert('Profissional cadastrado com sucesso!');
      setFormData({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        profissao: '',
      });
      setErrors({});
    } else {
      alert('Verifique os campos antes de enviar.');
    }
  };

  const renderInput = (label, name, icon, type = 'text') => (
    <div className="col-md-6 mb-3" key={name}>
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={`bi bi-${icon}`}></i>
        </span>
        <input
          type={type}
          id={name}
          name={name}
          className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
          placeholder={`Digite seu ${label.toLowerCase()}`}
          value={formData[name]}
          onChange={handleChange}
        />
        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h2>Cadastro de Profissional</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          {renderInput('Nome', 'nome', 'person')}
          {renderInput('Sobrenome', 'sobrenome', 'person-fill')}
        </div>
        <div className="row">
          {renderInput('E-mail', 'email', 'envelope', 'email')}
          {renderInput('Telefone', 'telefone', 'telephone', 'tel')}
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="profissao">Profissão</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-briefcase"></i>
              </span>
              <select
                id="profissao"
                name="profissao"
                className={`form-select ${errors.profissao ? 'is-invalid' : ''}`}
                value={formData.profissao}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="Médico">Médico</option>
                <option value="Psicólogo">Psicólogo</option>
                <option value="Enfermeiro">Enfermeiro</option>
                <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                <option value="Assistente Social">Assistente Social</option>
              </select>
              {errors.profissao && (
                <div className="invalid-feedback">{errors.profissao}</div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-check-circle me-2"></i>Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroProfissional;
