import { useState } from "react";
import "../css/components/ProductCard.css";

function ProductCard({ product, onAddToCart, isAdmin, onDelete, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);
  const productId = product._id || product.id;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img
          src={`http://localhost:5000${product.imageURL}`}
          alt={product.name}
          className="product-image"
        />

        {/* USER */}
        {isHovered && !isAdmin && (
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
        )}

        {/* ADMIN */}
        {isHovered && isAdmin && (
          <div className="admin-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(productId)}
            >
              ✏️ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(productId)}
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;
