import { useCartStore } from "../store/cartStore.js";

const addProductToCart = useCartStore((state) => state.addProductToCart);

const handleAddToCart = async (productId) => {
  try {
    await addProductToCart(productId);
    alert("Product added to cart!");
  } catch (err) {
    console.error(err);
    alert("Failed to add product to cart!");
  }
};

// Button in ProductCard.jsx
<button onClick={() => handleAddToCart(product.id)}>
  Add to Cart
</button>
