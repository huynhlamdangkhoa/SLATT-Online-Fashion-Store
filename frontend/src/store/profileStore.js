import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/profile";

axios.defaults.withCredentials = true;

export const useProfileStore = create((set, get) => ({
    profile: null,
    error: null,
    isLoading: false,
    message: null,

    getUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/`);

            set({
                profile: response.data.data.userProfile,
                message: response.data.data.message,
                isLoading: false,
            });
        } catch (err) {
            set({ error: err.response?.data?.message, isLoading: false });
            throw err;
        }
    },

    updateUserProfile: async (fullName, phoneNumber, address) => {
        set({ isLoading: true, error: null });
        try {
            console.log(fullName, phoneNumber, address);
            const response = await axios.patch(`${API_URL}/`, { fullName, phoneNumber, address });

            set({
                profile: response.data.data.userProfile,
                message: response.data.data.message,
                isLoading: false,
            });

            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message, isLoading: false });
            return err.response;
        }
    },
}));
