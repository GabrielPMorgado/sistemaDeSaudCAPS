import React, { useState } from 'react';
import './CadastroPaciente.css';

function CadastroPaciente({ adicionarPaciente }) {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    nascimento: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    rua: '',
    numero: '',
    bairro: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarTelefone = (tel) => /^\d{10,11}$/.test(tel.replace(/\D/g, ''));

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!formData.sobrenome.trim()) newErrors.sobrenome = 'Sobrenome é obrigatório.';
    if (!formData.nascimento.trim()) newErrors.nascimento = 'Data de nascimento é obrigatória.';

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!validarEmail(formData.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else if (!validarTelefone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido.';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório.';
    } else if (!validarCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido.';
    }

    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório.';
    if (!formData.rua.trim()) newErrors.rua = 'Rua é obrigatória.';
    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório.';
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      adicionarPaciente(formData);
      alert('Cadastro realizado com sucesso!');
      setFormData({
        nome: '',
        sobrenome: '',
        nascimento: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        rua: '',
        numero: '',
        bairro: '',
      });
      setErrors({});
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  };

  const renderInput = (label, name, icon, type = 'text') => (
    <div className="col-md-6 mb-3" key={name}>
      <label htmlFor={name} className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={`bi bi-${icon}`}></i>
        </span>
        <input
          type={type}
          id={name}
          name={name}
          aria-label={label}
          className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
          placeholder={`Digite ${label.toLowerCase()}`}
          value={formData[name]}
          onChange={handleChange}
        />
        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    </div>
  );

  return (
    <div className="container cadastro-container">
      <h2 className="text-center">Cadastro de Paciente</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          {renderInput('Nome', 'nome', 'person')}
          {renderInput('Sobrenome', 'sobrenome', 'person-fill')}
        </div>
        <div className="row">
          {renderInput('Data de Nascimento', 'nascimento', 'calendar', 'date')}
          {renderInput('E-mail', 'email', 'envelope', 'email')}
        </div>
        <div className="row">
          {renderInput('Telefone', 'telefone', 'telephone', 'tel')}
          {renderInput('CPF', 'cpf', 'credit-card')}
        </div>
        <div className="row">
          {renderInput('Endereço', 'endereco', 'geo-alt')}
          {renderInput('Rua', 'rua', 'signpost')}
        </div>
        <div className="row">
          {renderInput('Número', 'numero', '123')}
          {renderInput('Bairro', 'bairro', 'house-door')}
        </div>
        <div className="d-grid mt-3">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-check-circle me-2"></i> Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroPaciente;
