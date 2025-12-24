import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  placeTheOrder: async (orderData) => {
  set({ isLoading: true, error: null });
  try {
    console.log("📤 Sending order to backend:", orderData);

    const res = await axios.post(API_URL, orderData);

    console.log("✅ Order response:", res.data);

    set({ isLoading: false });
    return res.data;
  } catch (err) {
    console.error("❌ Order API error:", err.response || err);

    set({
      error: err.response?.data?.message || "Error placing order",
      isLoading: false,
    });
    throw err;
  }
},


  getOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/`);
      set({ orders: res.data.data.orders, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching orders", isLoading: false });
    }
  },

  getOrdersAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/admin`);
      set({ orders: res.data.data.orders, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching admin orders", isLoading: false });
    }
  },
}));
