import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // inicializar o navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      onLoginSuccess();
      navigate("/home"); 
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className="login-page">
      <main className="login-main">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Acesso ao Sistema</h2>

          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}

export default Login;
