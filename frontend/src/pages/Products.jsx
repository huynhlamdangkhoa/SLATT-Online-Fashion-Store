import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";

import "../css/pages/Products.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";

import { useProductsStore } from "../store/productsStore.js";
import { useCartStore } from "../store/cartStore.js";
import { useAuthStore } from "../store/authStore.js";

function Products() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  const { addProductToCart } = useCartStore();
  const {
    products,
    isLoading,
    error,
    totalCount,
    totalPages,
    currentPage,
    searchTerm,
    selectedCategories,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    setSearchTerm,
    setSelectedCategories,
    setSortBy,
    setPriceRange,
    setCurrentPage,
    getProducts,
    clearError,
    deleteProduct,
  } = useProductsStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [localMinPrice, setLocalMinPrice] = useState(0);
  const [localMaxPrice, setLocalMaxPrice] = useState(20.0);

  const sortByOptions = [
    { label: "Sort by Name (A-Z)", field: "name", order: "asc" },
    { label: "Sort by Name (Z-A)", field: "name", order: "desc" },
    { label: "Sort by Price (Low-High)", field: "price", order: "asc" },
    { label: "Sort by Price (High-Low)", field: "price", order: "desc" },
  ];

  const filters = [
    { id: "All", label: "All" },
    { id: "Shirt", label: "Shirt" },
    { id: "Pants", label: "Pants" },
    { id: "Dress", label: "Dress" },
    { id: "Shoes", label: "Shoes" },
  ];

  const getCurrentSortOption = () => {
    const option = sortByOptions.find(
      (opt) => opt.field === sortBy && opt.order === sortOrder
    );
    return option ? option.label : "Sort by Name (A-Z)";
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => setLocalSearchTerm(searchTerm), [searchTerm]);
  useEffect(() => {
    setLocalMinPrice(minPrice || 0);
    setLocalMaxPrice(maxPrice || 20.0);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
        getProducts();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearchTerm]);

  const handleCategoryChange = (category) => {
    let newCategories;
    if (category === "All") newCategories = ["All"];
    else {
      const isAllSelected = selectedCategories.includes("All");
      const isCategorySelected = selectedCategories.includes(category);
      if (isAllSelected) newCategories = [category];
      else if (isCategorySelected) {
        newCategories = selectedCategories.filter((c) => c !== category);
        if (newCategories.length === 0) newCategories = ["All"];
      } else newCategories = [...selectedCategories, category];
    }
    setSelectedCategories(newCategories);
    getProducts();
  };

  const handleSortChange = (option) => {
    setSortBy(option.field, option.order);
    setIsDropdownOpen(false);
    getProducts();
  };

const handleAddToCart = async (product) => {
  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  const result = await addProductToCart(product._id || product.id);

    if (result.status === "success") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/products/${id}/edit`);
  };



  const handleDeleteProduct = async (productId) => {
      const ok = window.confirm("Are you sure you want to delete this product?");
      if (!ok) return;

      const result = await deleteProduct(productId);

      if (result.status === "success") {
        toast.success("Product deleted");
        getProducts();
      } else {
        toast.error(result.message || "Delete failed");
      }
    };

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  if (error) {
    return (
      <div className="page-container">
        <NavBar />
        <div className="error-container">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button onClick={() => { clearError(); getProducts(); }}>Try Again</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <NavBar />
      <div className="products-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="search-container">
              <FontAwesomeIcon className="search-icon" size={16} icon={faSearch} />
              <input
                type="text"
                placeholder="Search products..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
            </div>
            <div className="dropdown-container">
              <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {getCurrentSortOption()}
                <FontAwesomeIcon className="dropdown-icon" size={16} icon={faCaretDown} />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {sortByOptions.map((option) => (
                    <button
                      key={option.label}
                      className={`dropdown-option ${getCurrentSortOption() === option.label ? "selected" : ""}`}
                      onClick={() => handleSortChange(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="sidebar-section">
            <h4 className="section-title">CATEGORY</h4>
            <div className="category-list">
              {filters.map((category) => (
                <div className="category-group" key={category.id}>
                  <input
                    className="category-input"
                    id={category.id}
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={category.id} className="category-label">{category.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="products-header">
            <div className="results-info">
              {isLoading ? "Loading..." : `Showing ${totalCount > 0 ? startIndex + 1 : 0} - ${endIndex} of ${totalCount} results`}
            </div>
          </div>

          <div className="products-grid">
            {isLoading ? (
              <div className="loading-spinner">Loading products...</div>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                key={product._id || product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
                isAdmin={isAdmin}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
