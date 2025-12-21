import { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

import s from "../css/components/CartItem.module.css";

import { useCartStore } from "../store/cartStore.js";

function CartItem({ cartItem }) {
    const increaseProductQuantity = useCartStore((state) => state.increaseProductQuantity);
    const decreaseProductQuantity = useCartStore((state) => state.decreaseProductQuantity);
    const deleteProductFromCart = useCartStore((state) => state.deleteProductFromCart);

    const increaseQuantity = useCallback(() => {
        increaseProductQuantity(cartItem.product._id);
    }, [increaseProductQuantity, cartItem.product._id]);

    const decreaseQuantity = useCallback(() => {
        decreaseProductQuantity(cartItem.product._id);
    }, [decreaseProductQuantity, cartItem.product._id]);

    const handleDeleteProductFromCart = useCallback(async () => {
        console.log(cartItem);
        await deleteProductFromCart(cartItem.id);
    }, [deleteProductFromCart, cartItem.id, cartItem]);

    return (
        <div className={s.cart_item_row}>
            {/* Product */}
            <div className={s.product_container}>
                <div className={s.product_image_container}>
                    <img src={cartItem.product.imageURL} alt={cartItem.product.name} className={s.product_image} />
                </div>
                <span className={s.product_name}>{cartItem.product.name}</span>
            </div>

            {/* Price */}
            <div className={s.product_price}>${cartItem.price.toFixed(2)}</div>

            {/* Quantity Controls */}
            <div className={s.product_quantity_container}>
                <button onClick={decreaseQuantity} className={s.product_quantity_button}>
                    <FontAwesomeIcon size={16} icon={faMinus} className={s.product_quantity_icon} />
                </button>

                <span className={s.product_quantity}>{cartItem.quantity}</span>

                <button onClick={increaseQuantity} className={s.product_quantity_button}>
                    <FontAwesomeIcon size={16} icon={faPlus} className={s.product_quantity_icon} />
                </button>
            </div>

            {/* Subtotal */}
            <div className={s.product_subtotal}>
                ${(cartItem.price * cartItem.quantity).toFixed(2)}
                <div className={s.product_delete}>
                    <button className={s.product_delete_button} onClick={handleDeleteProductFromCart}>
                        <FontAwesomeIcon className={s.delete_icon} icon={faX} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
