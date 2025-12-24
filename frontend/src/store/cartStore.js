import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/cart";
axios.defaults.withCredentials = true;

export const useCartStore = create((set, get) => ({
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  calculateTotals: (items) => ({
    totalAmount: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  }),


  // ADD TO CART
addProductToCart: async (productId) => {
  set({ isLoading: true, error: null });
  try {
    const res = await axios.post(`${API_URL}/${productId}`);

    await get().getCartItems();

    return {
      status: "success",
      message: res.data.message || "Added to cart successfully",
    };
  } catch (err) {
    const message =
      err.response?.data?.message || "Error adding product to cart";

    set({ error: message, isLoading: false });

    return {
      status: "error",
      message,
    };
  }
},

  // GET CART
  getCartItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      const items = res.data.data.cartItems || [];
      const totals = get().calculateTotals(items);

      set({
        cartItems: items,
        totalAmount: totals.totalAmount,
        totalItems: totals.totalItems,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch cart",
        isLoading: false,
      });
    }
  },

  // INCREASE
  increaseProductQuantity: async (cartItemId) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/increase/item/${cartItemId}`);

      await get().getCartItems();
    } catch (err) {
      set({ error: "Error increasing quantity", isLoading: false });
    }
  },

  // DECREASE
  decreaseProductQuantity: async (cartItemId) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/decrease/item/${cartItemId}`);

      // ✅ SYNC LẠI TỪ SERVER
      await get().getCartItems();
    } catch (err) {
      set({ error: "Error decreasing quantity", isLoading: false });
    }
  },

  // DELETE
  deleteProductFromCart: async (cartItemId) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${API_URL}/item/${cartItemId}`);

      await get().getCartItems();
    } catch (err) {
      set({ error: "Error deleting item", isLoading: false });
    }
  },


  // CHECK OUT
checkout: async (checkoutData) => {
  set({ isLoading: true, error: null });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/orders/checkout",
      checkoutData
    );

    set({
      cartItems: [],
      totalAmount: 0,
      totalItems: 0,
      isLoading: false,
    });

    return {
      status: "success",
      message: res.data.message || "Checkout successful",
      order: res.data.data,
    };
  } catch (err) {
    const message =
      err.response?.data?.message || "Checkout failed";

    set({ error: message, isLoading: false });

    return {
      status: "error",
      message,
    };
  }
},


}));
