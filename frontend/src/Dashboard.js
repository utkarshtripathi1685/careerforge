import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:8000/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data);
      setSkills(res.data.skills?.join(", ") || "");
    });
  }, []);

  const saveSkills = () => {
    axios.put("http://localhost:8000/skills",
      { skills: skills.split(",").map(s => s.trim()) },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => alert("Skills updated"));
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <h3>Your Skills (comma separated)</h3>

      <input
        value={skills}
        onChange={e => setSkills(e.target.value)}
        placeholder="Python, React, MongoDB"
      />

      <button onClick={saveSkills}>Save Skills</button>

      <br/><br/>

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
