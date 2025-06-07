export default (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ 
      message: 'Registro duplicado (CRM/CPF já existe)' 
    });
  }

  res.status(500).json({ 
    message: 'Erro interno no servidor' 
  });
};