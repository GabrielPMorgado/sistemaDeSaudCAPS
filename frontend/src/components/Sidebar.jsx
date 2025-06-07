import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    toggleSidebar();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'show' : ''}`} aria-hidden={!isOpen}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Painel</h2>
        <button
          className="btn-close"
          onClick={toggleSidebar}
          aria-label="Fechar menu lateral"
          type="button"
        />
      </div>

      <nav className="sidebar-nav" aria-label="Menu principal">
        <ul>
          <li><Link to="/home" onClick={toggleSidebar}><i className="bi bi-house-door"></i> Início</Link></li>
          <li><Link to="/cadastro-paciente" onClick={toggleSidebar}><i className="bi bi-person-plus"></i> Cadastro de Pacientes</Link></li>
          <li><Link to="/cadastro-profissional" onClick={toggleSidebar}><i className="bi bi-person-workspace"></i> Cadastro de Profissionais</Link></li>
          <li><Link to="/cadastro-horario" onClick={toggleSidebar}><i className="bi bi-calendar-plus"></i> Cadastro de Horário</Link></li>
          <li><Link to="/visualizar-profissionais" onClick={toggleSidebar}><i className="bi bi-search"></i> Visualizar Profissionais</Link></li>
          <li><Link to="/visualizar-pacientes" onClick={toggleSidebar}><i className="bi bi-people"></i> Visualizar Pacientes</Link></li>
        </ul>
        <button onClick={handleLogoutClick} className="btn-logout" aria-label="Sair do sistema">
          <i className="bi bi-box-arrow-right"></i> Sair
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
