import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    clearError: () => set({ error: null }),

    clearMessages: () => set({ error: null, message: null }),

    signup: async (fullName, phoneNumber, email, password, confirmPassword) => {
    set({ isLoading: true, error: null });

    try {
        const response = await axios.post(`${API_URL}/signup`, {
            fullName,
            phoneNumber,
            email,
            password,
            confirmPassword,
        });

        set({
            user: null,                 // ❗ chưa login
            isAuthenticated: false,     // ❗ QUAN TRỌNG
            isLoading: false,
            message: "Signup successful. Please login.",
        });
    } catch (err) {
        set({
            error: err.response?.data?.message || "Error signing up",
            isLoading: false,
        });
        throw err;
    }
},


    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signin`, {
                email,
                password,
            });
            set({
                isAuthenticated: true,
                user: response.data.data.user,
                error: null,
                isLoading: false,
            });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Error logging in",
                isLoading: false,
            });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signout`);
            set({
                isAuthenticated: false,
                error: null,
                isLoading: false,
                user: null,
            });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Error logging out",
                isLoading: false,
            });
            throw err;
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/password-forgot`, {
                email,
            });
            set({ message: response.data.message, isLoading: false });
        } catch (err) {
            set({
                isLoading: false,
                error:
                    err.response.data.message ||
                    "Error sending reset passsword email",
            });
            throw err;
        }
    },

    resetPassword: async (token, newPassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${API_URL}/password-reset/${token}`,
                { newPassword }
            );
            set({ message: response.data.message, isLoading: false });
        } catch (err) {
            set({
                isLoading: false,
                error: err.reponse.data.message || "Error resetting password",
            });
            throw err;
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios.get(`${API_URL}/auth-check`);
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                isCheckingAuth: false,
            });
        } catch (err) {
            set({
                error: null,
                isCheckingAuth: false,
                isAuthenticated: false,
                user: null,
            });
        }
    },
}));
