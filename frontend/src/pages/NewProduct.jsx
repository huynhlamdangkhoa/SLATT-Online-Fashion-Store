import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import styles from "../css/pages/NewProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import { useProductsStore } from "../store/productsStore.js";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  const { createNewProduct, error, isLoading, clearError } = useProductsStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleInputChange = (setter) => (e) => {
    if (error) clearError();
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    if (error) clearError();
    const file = e.target.files[0];
    setImageFile(file || null);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Product name is required");
      isValid = false;
    } else if (name.length < 2) {
      setNameError("Product name must be at least 2 characters long");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setPriceError("Please enter a valid price");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!category) {
      toast.error("Please select a category");
      isValid = false;
    }

    if (!imageFile) {
      toast.error("Please select an image");
      isValid = false;
    }

    return isValid;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("price", parseFloat(price));
      formData.append("category", category);
      formData.append("stock", parseInt(stock) || 0);
      formData.append("available", available ? "true" : "false");
      formData.append("image", imageFile); // backend nhận key "image"
      formData.append("description", description);

      await createNewProduct(formData);

      toast.success("Added new product successfully");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <>
      <title>Add New Product | Sweety</title>
      <div className="page-container">
        <NavBar />
        <div className={styles.productModal}>
          <h2>Add New Product</h2>
          <form className={styles.productForm} onSubmit={handleAddProduct}>
            <label>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="Enter product name"
              className={styles.productInput}
            />

            <label>Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={handleInputChange(setPrice)}
              placeholder="0.00"
              className={styles.productInput}
            />

            <label>Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />

            <label>Category</label>
            <select
              value={category}
              onChange={handleInputChange(setCategory)}
              className={styles.categorySelect}
            >
              <option value="">Select a category</option>
              <option value="Breads">Breads</option>
              <option value="Cakes">Cakes</option>
              <option value="Candies">Candies</option>
              <option value="Pastries">Pastries</option>
            </select>

            <label>Stock Quantity</label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={handleInputChange(setStock)}
              placeholder="0"
              className={styles.productInput}
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={handleInputChange(setDescription)}
              placeholder="Enter product description"
              className={styles.productInput}
            />

            <label>
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              Available for sale
            </label>

            {nameError && <p className={styles.errorMessage}>{nameError}</p>}
            {priceError && <p className={styles.errorMessage}>{priceError}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" disabled={isLoading} className={styles.productButton}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Add Product"}
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default NewProduct;
