import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/products";
axios.defaults.withCredentials = true;

export const useProductsStore = create((set, get) => ({
  // State
  products: [],
  error: null,
  message: null,
  isLoading: false,

  searchTerm: "",
  selectedCategories: ["All"],
  sortBy: "name",
  sortOrder: "asc",
  minPrice: null,
  maxPrice: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,

  // ---- Helpers ----
  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),

  // ---- Setters ----
  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories, currentPage: 1 }),
  setSortBy: (field, order = "asc") => set({ sortBy: field, sortOrder: order, currentPage: 1 }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  // ---- Build Query ----
  buildQueryParams: () => {
    const state = get();
    const params = new URLSearchParams();

    if (state.searchTerm?.trim()) params.append("search", state.searchTerm.trim());

    if (state.selectedCategories.length && !state.selectedCategories.includes("All")) {
      state.selectedCategories.forEach(cat => params.append("category", cat));
    }

    if (state.sortBy) {
      const sortValue = state.sortOrder === "desc" ? -1 : 1;
      params.append(`sort[${state.sortBy}]`, sortValue);
    }

    if (state.minPrice !== null && state.minPrice !== "") params.append("price[gte]", state.minPrice);
    if (state.maxPrice !== null && state.maxPrice !== "") params.append("price[lte]", state.maxPrice);

    params.append("page", state.currentPage);
    params.append("limit", 12);

    return params.toString();
  },

  // ---- API Actions ----
  getProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const query = get().buildQueryParams();
      const { data } = await axios.get(`${API_URL}/?${query}`);
      set({
        products: data.data.products || [],
        totalCount: data.totalCount || 0,
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching products", isLoading: false });
      throw err;
    }
  },

  createNewProduct: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await get().getProducts();

      set({ message: "Product created successfully", isLoading: false });
      return data.data.product;
    } catch (err) {
      set({ error: err.response?.data?.message || "Error creating product", isLoading: false });
      throw err;
    }
  },

  // ---- Filters / Pagination ----
  applyFilters: async () => {
    set({ currentPage: 1 }); // reset page
    await get().getProducts();
  },

  searchProducts: async (term) => {
    set({ searchTerm: term, currentPage: 1 });
    await get().getProducts();
  },

  filterByCategory: async (categories) => {
    set({ selectedCategories: categories, currentPage: 1 });
    await get().getProducts();
  },

  sortProducts: async (field, order = "asc") => {
    set({ sortBy: field, sortOrder: order, currentPage: 1 });
    await get().getProducts();
  },

  filterByPriceRange: async (min, max) => {
    set({ minPrice: min, maxPrice: max, currentPage: 1 });
    await get().getProducts();
  },

  goToPage: async (page) => {
    set({ currentPage: page });
    await get().getProducts();
  },
}));
