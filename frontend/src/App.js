import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:8000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("token", response.data.access_token);

      navigate("/dashboard");

    } catch {
      alert("Login Failed");
    }
  };

  return (
  <Routes>
    <Route
      path="/"
      element={
        <div>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      }
    />

    <Route
      path="/dashboard"
      element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" />}
    />
  </Routes>
);

}

export default App;
