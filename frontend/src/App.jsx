import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import CadastroPaciente from './pages/CadastroPacientes';
import CadastroProfissional from './pages/CadastroProfissional';
import CadastroHorario from './pages/CadastroHorario';
import VisualizarProfissionais from './pages/VisualizarProfissionais';
import VisualizarPacientes from './pages/VisualizarPacientes';
import Login from './pages/Login';

function PrivateRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

function PublicRoute({ isLoggedIn }) {
  return !isLoggedIn ? <Outlet /> : <Navigate to="/cadastro-paciente" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(logged);

    const pacientesSalvos = JSON.parse(localStorage.getItem('pacientes')) || [];
    const profissionaisSalvos = JSON.parse(localStorage.getItem('medicos')) || [];
    setPacientes(pacientesSalvos);
    setProfissionais(profissionaisSalvos);
  }, []);

  const atualizarLocalStorage = (chave, dados, setState) => {
    localStorage.setItem(chave, JSON.stringify(dados));
    setState(dados);
  };

  // ---------- Profissionais ----------
  const adicionarProfissional = (profissional) => {
    const novo = { ...profissional, id: Date.now().toString() };
    const atualizados = [...profissionais, novo];
    atualizarLocalStorage('medicos', atualizados, setProfissionais);
  };

  const apagarProfissional = (profissional) => {
    const atualizados = profissionais.filter((p) => p.id !== profissional.id);
    atualizarLocalStorage('medicos', atualizados, setProfissionais);
  };

  const editarProfissional = (profissionalAtualizado) => {
    const atualizados = profissionais.map((p) =>
      p.id === profissionalAtualizado.id ? profissionalAtualizado : p
    );
    atualizarLocalStorage('medicos', atualizados, setProfissionais);
  };

  // ---------- Pacientes ----------
  const adicionarPaciente = (paciente) => {
    const novo = { ...paciente, id: Date.now().toString() };
    const atualizados = [...pacientes, novo];
    atualizarLocalStorage('pacientes', atualizados, setPacientes);
  };

  const apagarPaciente = (paciente) => {
    const atualizados = pacientes.filter((p) => p.id !== paciente.id);
    atualizarLocalStorage('pacientes', atualizados, setPacientes);
  };

  const editarPaciente = (pacienteAtualizado) => {
    const atualizados = pacientes.map((p) =>
      p.id === pacienteAtualizado.id ? pacienteAtualizado : p
    );
    atualizarLocalStorage('pacientes', atualizados, setPacientes);
  };

  return (
    <Router>
      {isLoggedIn && <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />}
      <div className="d-flex">
        {isLoggedIn && <Sidebar isOpen={sidebarOpen} />}

        <main className="flex-grow-1 p-3">
          <Routes>
            <Route element={<PublicRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            </Route>

            <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route
                path="/cadastro-paciente"
                element={
                  <CadastroPaciente
                    adicionarPaciente={adicionarPaciente}
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    onEditar={editarPaciente}
                    onApagar={apagarPaciente}
                  />
                }
              />
              <Route
                path="/cadastro-profissional"
                element={<CadastroProfissional adicionarProfissional={adicionarProfissional} />}
              />
              <Route path="/cadastro-horario" element={<CadastroHorario />} />
              <Route
                path="/visualizar-profissionais"
                element={
                  <VisualizarProfissionais
                    profissionais={profissionais}
                    onEditar={editarProfissional}
                    onApagar={apagarProfissional}
                  />
                }
              />
              <Route
                path="/visualizar-pacientes"
                element={
                  <VisualizarPacientes
                    pacientes={pacientes}
                    onEditar={editarPaciente}
                    onApagar={apagarPaciente}
                  />
                }
              />
            </Route>
          </Routes>
        </main>
      </div>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
