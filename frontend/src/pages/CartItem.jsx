import React from "react";
import s from "../css/components/CartItem.module.css";

function CartItem({ cartItem, onIncrease, onDecrease, onDelete }) {
  if (!cartItem?.product) return null;

  const { product, quantity, price } = cartItem;
  const itemPrice = price || product.price || 0;
  const subtotal = (itemPrice * quantity).toFixed(2);

  return (
    <div className={s.cart_item}>
      <div className={s.product_info}>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className={s.product_image}
        />
        <span className={s.product_name}>{product.name}</span>
      </div>
      <div className={s.product_price}>${itemPrice.toFixed(2)}</div>
      <div className={s.product_quantity}>
        <button
          onClick={onDecrease}
          className={s.qty_btn}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={onIncrease} className={s.qty_btn}>
          +
        </button>
      </div>
      <div className={s.product_subtotal}>${subtotal}</div>
      <div className={s.product_actions}>
        <button onClick={onDelete} className={s.delete_btn}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
