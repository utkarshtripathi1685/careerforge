import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", email);
    form.append("password", password);

    const res = await API.post("/login", form);

    localStorage.setItem("token", res.data.access_token);
    window.location.href = "/profile";
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
