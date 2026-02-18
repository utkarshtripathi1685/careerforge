import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:8000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });

  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
  <div style={{ padding: 30 }}>
    <h1>CareerForge Dashboard</h1>

    {user && (
      <>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </>
    )}

    <button onClick={() => {
      localStorage.removeItem("token");
      navigate("/");
    }}>
      Logout
    </button>
  </div>
);

}

export default Dashboard;
