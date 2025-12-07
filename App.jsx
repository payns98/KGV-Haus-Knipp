import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Login-Komponente
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy Login: admin / 123
    if (username === "admin" && password === "123") {
      onLogin(); // Login erfolgreich
    } else {
      alert("Falsche Zugangsdaten!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Dashboard-Komponente
function Dashboard({ onLogout }) {
  return (
    <div>
      <h2>Willkommen im Dashboard!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

// ProtectedRoute
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Prüfen, ob LocalStorage Login gespeichert ist
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLogin);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
