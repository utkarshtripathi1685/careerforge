import { useEffect, useState } from "react";
import API from "../api";
import {logout} from "../auth";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/profile").then(res => setUser(res.data));
  }, []);

  return (
  <div>
    <h1>Dashboard</h1>

    {user && (
      <>
        <p>Welcome {user.name}</p>
        <p>{user.email}</p>
      </>
    )}

    <button onClick={logout}>Logout</button>
  </div>
);

}
