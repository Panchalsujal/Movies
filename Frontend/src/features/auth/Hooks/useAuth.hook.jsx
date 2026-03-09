import {
  login as loginService,
  register as registerService,
} from "../services/auth.service";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  const { user, login, logout, loading, setLoading } = context;

  async function handleRegister(username, email, password, role) {
    setLoading(true);
    try {
      const response = await registerService({
        username,
        email,
        password,
        role,
      });

      login(response.user);

      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(username, password) {
    setLoading(true);

    try {
      const response = await loginService(username, password);

      login(response.user);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }
  return {
    handleLogin,
    handleRegister,
    user,
    loading,
  };
};
