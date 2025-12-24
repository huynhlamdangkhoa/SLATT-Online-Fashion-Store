import s from "../css/components/CartItem.module.css";
import { useCartStore } from "../store/cartStore.js";

function CartItem({ cartItem }) {
  if (!cartItem) return null;

  const { id, quantity, price, Product } = cartItem;
  const subtotal = (price * quantity).toFixed(2);

  const increaseProductQuantity = useCartStore(
    (state) => state.increaseProductQuantity
  );
  const decreaseProductQuantity = useCartStore(
    (state) => state.decreaseProductQuantity
  );
  const deleteProductFromCart = useCartStore(
    (state) => state.deleteProductFromCart
  );

  return (
    <div className={s.cart_item}>
      {/* PRODUCT */}
      <div className={s.product_info}>
        <img
          src={
            Product.imageURL
              ? `http://localhost:5000${Product.imageURL}`
              : "/placeholder.png"
          }
          alt={Product.name}
          className={s.product_image}
        />

        <span className={s.product_name}>
          {Product.name ?? `Product #${id}`}
        </span>

      </div>

      {/* PRICE */}
      <div className={s.product_price}>
        ${price.toFixed(2)}
      </div>

      {/* QUANTITY */}
      <div className={s.product_quantity}>
        <button
          onClick={() => decreaseProductQuantity(id)}
          disabled={quantity <= 1}
        >
          −
        </button>
        <span>{quantity}</span>
        <button onClick={() => increaseProductQuantity(id)}>+</button>
      </div>

      {/* SUBTOTAL + DELETE */}
      <div className={s.product_subtotal}>
        ${subtotal}
        <button
          className={s.delete_btn}
          onClick={() => deleteProductFromCart(id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default CartItem;
