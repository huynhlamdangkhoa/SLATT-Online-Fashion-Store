import { useState } from "react";

import "../css/components/ProductCard.css";

function ProductCard({ product, onAddToCart }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                <img
                    src={product.imageURL}
                    alt={product.name}
                    className="product-image"
                />
                {isHovered && (
                    <button
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(product)}
                    >
                        Add to cart
                    </button>
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
