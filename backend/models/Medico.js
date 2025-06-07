export class Medico {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.crm = data.crm;
    this.especialidade = data.especialidade;
    this.telefone = data.telefone;
    this.email = data.email;
    this.status = data.status || 'ativo';
  }

  validate() {
    const errors = [];
    
    if (!this.nome || this.nome.length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }
    
    if (!this.crm || this.crm.length < 4) {
      errors.push('CRM inválido');
    }
    
    if (!this.especialidade) {
      errors.push('Especialidade é obrigatória');
    }
    
    return errors;
  }
}