import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authStore";
import "../css/pages/EditProduct.css";

const API_URL = "http://localhost:5000/api/v1/products";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  // ❌ chặn user thường
  useEffect(() => {
    if (!isAdmin) {
      toast.error("You are not allowed to access this page");
      navigate("/");
    }
  }, [isAdmin]);

  // 📌 load product
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        const product = res.data.data.product;
        setForm({
          name: product.name,
          price: product.price,
          category: product.category,
          image: null,
        });
        setPreviewImage(`http://localhost:5000${product.imageURL}`);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product");
        navigate("/products");
      });
  }, [id]);

  // input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      await axios.patch(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product updated successfully");
      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <p style={{ padding: 40 }}>Loading product...</p>;
  }

  return (
  <div className="page-container">
    <NavBar />

    <div className="editProductModal">
      <div className="editProductTitle">
        <h2>Edit Product</h2>
      </div>

      <form
        className="editProductForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* NAME */}
        <div>
          <label>Name</label>
          <div className="editInputWrapper">
            <input
              type="text"
              name="name"
              className="editProductInput"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* PRICE */}
        <div>
          <label>Price</label>
          <div className="editInputWrapper">
            <input
              type="number"
              name="price"
              step="0.01"
              className="editProductInput"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div>
          <label>Category</label>
          <div className="editSelectWrapper">
            <select
              name="category"
              className="editCategorySelect"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Shirt">Shirt</option>
              <option value="Pants">Pants</option>
              <option value="Dress">Dress</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
        </div>

        {/* IMAGE */}
        <div>
          <label>Image</label>
          <div className="editFileWrapper">
            <input
              type="file"
              name="image"
              className="editFileInput"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PREVIEW */}
        {previewImage && (
          <img
            src={previewImage}
            alt="preview"
            className="editImagePreview"
          />
        )}

        {/* ACTIONS */}
        <div className="editProductActions">
          <button
            type="submit"
            className="editSaveBtn"
            disabled={saving}
          >
            {saving ? "Saving..." : "Update"}
          </button>

          <button
            type="button"
            className="editCancelBtn"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <Footer />
  </div>
);

}

export default EditProductPage;
