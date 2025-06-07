import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo" aria-label="Rodapé do site">
      <p>
        &copy; {new Date().getFullYear()} <strong>Vitalidade Medical Center</strong>. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
