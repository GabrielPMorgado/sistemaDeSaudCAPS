import React from 'react';
import './Header.css';

function Header({ toggleSidebar, showMenu = true }) {
  return (
    <header className="header">
      <nav className="navbar" role="navigation" aria-label="Menu principal">
        {showMenu && (
          <button
            type="button"
            className="btn-toggle-sidebar"
            onClick={toggleSidebar}
            aria-label="Alternar menu lateral"
            aria-expanded="false"
          >
            <i className="bi bi-list" aria-hidden="true"></i>
          </button>
        )}
        <h1 className="navbar-brand">Sistema</h1>
      </nav>
    </header>
  );
}

export default Header;
