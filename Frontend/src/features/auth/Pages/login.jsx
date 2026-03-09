import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth.hook";
import "../shared/styles/Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left welcome panel */}
        <div className="welcome-section">
          <h1>Welcome!</h1>
          <p>Sign in to watch your favorite content.</p>
          <button className="learn-btn">Learn More</button>
        </div>

        {/* Login form */}
        <div className="login-form">
          <h2>Sign in</h2>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="form-text">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </form>

          <div className="social-login">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
