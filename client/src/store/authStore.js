import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        isLoading: false,
        isAuthenticated: true,
        user: response.data.user,
      });
      return response.data.user;
    } catch (error) {
      set({
        isLoading: false,
        isAuthenticated: false,
        error: error.response.data.message,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        isCheckingAuth: false,
        isAuthenticated: true,
        user: response.data.user,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        error: error.response.data.message || "Error checking auth",
        isCheckingAuth: false,
      });
      throw error;
    }
  },
}));
