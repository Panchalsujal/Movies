import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth.hook";
import "../shared/styles/Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const { handleRegister, loading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, email, password, role);
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">

        {/* LEFT SIDE INFO */}
        <div className="register-info">
          <h1>Create Account</h1>
          {/* <button className="learn-btn">Learn More</button> */}
        </div>

        {/* REGISTER FORM */}
        <div className="register-card">
          <h2>Register</h2>

          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;