import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Login-Komponente
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      onLogin(true);
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

// Dashboard
function Dashboard() {
  return <h2>Willkommen im Dashboard!</h2>;
}

// ProtectedRoute
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
