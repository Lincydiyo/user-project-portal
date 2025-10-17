import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = login(username, password);
    if (loggedUser) {
      if (loggedUser.role === "admin") navigate("/dashboard");
      else navigate("/userhomepage");
    } else setError("Invalid credentials");
  };

  return (
    <div className="maindivision">
      <div className="homediv">
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Enter Your Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <label>Password</label>
            <input type="password" placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
