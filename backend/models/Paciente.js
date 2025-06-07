export class Paciente {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.telefone = data.telefone;
    this.email = data.email;
    this.data_nascimento = data.data_nascimento;
    this.status = data.status || 'ativo';
    this.medico_id = data.medico_id;
  }

  validate() {
    const errors = [];
    
    if (!this.nome || this.nome.length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }
    
    if (!this.cpf || !this.#validarCPF(this.cpf)) {
      errors.push('CPF inválido');
    }
    
    if (this.email && !this.#validarEmail(this.email)) {
      errors.push('E-mail inválido');
    }
    
    return errors;
  }

  #validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    return cpf.length === 11;
  }

  #validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}