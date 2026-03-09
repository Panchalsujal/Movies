import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ username, email, password, role }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/api/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
}
