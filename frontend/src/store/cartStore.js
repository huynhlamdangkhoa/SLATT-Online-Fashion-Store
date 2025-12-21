import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/cart";
axios.defaults.withCredentials = true;

export const useCartStore = create((set, get) => ({
  cartItems: [],
  activeOrder: null,
  totalAmount: 0,
  totalItems: 0,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  // Tính tổng tiền và tổng số lượng
  calculateTotals: (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { totalAmount, totalItems };
  },

  // Tìm item trong cart
  findCartItem: (productId) =>
    get().cartItems.find(
      (item) => item.product && (item.product.id === productId || item.product._id === productId)
    ),

  // Lấy danh sách cart items từ server
  getCartItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/`);
      const items = response.data.data.cartItems || [];
      const totals = get().calculateTotals(items);

      set({
        cartItems: items,
        activeOrder: response.data.data.activeOrder || null,
        totalAmount: totals.totalAmount,
        totalItems: totals.totalItems,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch cart items", isLoading: false });
    }
  },

  // Thêm sản phẩm vào cart
  addProductToCart: async (productId) => {
    if (!productId) return { status: "error", message: "Invalid product ID" };
    set({ isLoading: true, error: null });

    try {
      const existingItem = get().findCartItem(productId);

      let response;
      if (existingItem) {
        // Nếu đã có trong cart → gọi API tăng số lượng, cập nhật state sau khi có response
        response = await axios.post(`${API_URL}/increase/${productId}`);
        const updatedItem = response.data.data.item;

        set((state) => {
          const updatedCartItems = state.cartItems.map((i) =>
            i.product.id === productId || i.product._id === productId ? updatedItem : i
          );
          const totals = get().calculateTotals(updatedCartItems);
          return {
            cartItems: updatedCartItems,
            totalAmount: totals.totalAmount,
            totalItems: totals.totalItems,
            activeOrder: { ...state.activeOrder, totalAmount: totals.totalAmount, cartItems: updatedCartItems },
            isLoading: false,
          };
        });

        return { status: "success", message: "Product quantity increased", data: updatedItem };
      } else {
        // Thêm mới sản phẩm
        response = await axios.post(`${API_URL}/${productId}`);
        const newItem = response.data.data.cartItem;

        set((state) => {
          const updatedCartItems = [...state.cartItems, newItem];
          const totals = get().calculateTotals(updatedCartItems);
          return {
            cartItems: updatedCartItems,
            totalAmount: totals.totalAmount,
            totalItems: totals.totalItems,
            activeOrder: { ...state.activeOrder, totalAmount: totals.totalAmount, cartItems: updatedCartItems },
            isLoading: false,
          };
        });

        return { status: "success", message: "Product added to cart", data: newItem };
      }
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to add product", isLoading: false });
      return { status: "error", message: err.response?.data?.message || "Failed to add product" };
    }
  },

  // Tăng số lượng sản phẩm từ nút +
  increaseProductQuantity: async (productId) => {
    if (!productId) return;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/increase/${productId}`);
      const updatedItem = response.data.data.item;

      set((state) => {
        const updatedCartItems = state.cartItems.map((i) =>
          i.product.id === productId || i.product._id === productId ? updatedItem : i
        );
        const totals = get().calculateTotals(updatedCartItems);
        return {
          cartItems: updatedCartItems,
          totalAmount: totals.totalAmount,
          totalItems: totals.totalItems,
          activeOrder: { ...state.activeOrder, totalAmount: totals.totalAmount, cartItems: updatedCartItems },
          isLoading: false,
        };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error increasing quantity", isLoading: false });
    }
  },

  // Giảm số lượng sản phẩm từ nút -
  decreaseProductQuantity: async (productId) => {
    if (!productId) return;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/decrease/${productId}`);
      const updatedItem = response.data.data.item;

      set((state) => {
        const updatedCartItems = updatedItem
          ? state.cartItems.map((i) =>
              i.product.id === productId || i.product._id === productId ? updatedItem : i
            )
          : state.cartItems.filter((i) => i.product.id !== productId && i.product._id !== productId);

        const totals = get().calculateTotals(updatedCartItems);
        return {
          cartItems: updatedCartItems,
          totalAmount: totals.totalAmount,
          totalItems: totals.totalItems,
          activeOrder: { ...state.activeOrder, totalAmount: totals.totalAmount, cartItems: updatedCartItems },
          isLoading: false,
        };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error decreasing quantity", isLoading: false });
    }
  },

  // Xóa sản phẩm khỏi cart
  deleteProductFromCart: async (cartItemId) => {
    if (!cartItemId) return;
    set({ isLoading: true, error: null });

    try {
      await axios.delete(`${API_URL}/${cartItemId}`);
      set((state) => {
        const updatedItems = state.cartItems.filter((i) => i.id !== cartItemId);
        const totals = get().calculateTotals(updatedItems);
        return {
          cartItems: updatedItems,
          totalAmount: totals.totalAmount,
          totalItems: totals.totalItems,
          activeOrder: { ...state.activeOrder, totalAmount: totals.totalAmount, cartItems: updatedItems },
          isLoading: false,
        };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to delete product", isLoading: false });
    }
  },
}));
