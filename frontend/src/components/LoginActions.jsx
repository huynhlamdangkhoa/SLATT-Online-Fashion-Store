import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import s from "../css/components/LoginActions.module.css";

import { useAuthStore } from "../store/authStore.js";
import { useCartStore } from "../store/cartStore.js";

function LoginActions() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const { totalItems, getCartItems } = useCartStore();
    const { user } = useAuthStore();

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleUserClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCartClick = () => {
        navigate("/cart", { replace: true });
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate("/profile", { replace: true });
    };

    const handleTrackOrderClick = () => {
        setIsDropdownOpen(false);
        navigate("/track-order", { replace: true });
    };

    const handleShowOrders = () => {
        setIsDropdownOpen(false);
        navigate("/show-orders", { replace: true });
    };

    const handleNewProduct = () => {
        setIsDropdownOpen(false);
        navigate("/new-product", { replace: true });
    };

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        logout();
        navigate("/");
    };

    return (
        <ul className={s.navbarActions}>
            <li className={s.userDropdown} ref={dropdownRef}>
                <FontAwesomeIcon icon={faUser} onClick={handleUserClick} className={s.userIcon} />
                {isDropdownOpen && (
                    <div className={s.dropdownMenu}>
                        <button onClick={handleProfileClick} className={s.dropdownItem}>
                            Profile
                        </button>

                        {user.role === "admin" ? (
                            <button onClick={handleNewProduct} className={s.dropdownItem}>
                                New Product
                            </button>
                        ) : (
                            <></>
                        )}

                        {user.role === "admin" ? (
                            <button onClick={handleShowOrders} className={s.dropdownItem}>
                                Show Orders
                            </button>
                        ) : (
                            <button onClick={handleTrackOrderClick} className={s.dropdownItem}>
                                Track Order
                            </button>
                        )}

                        <button onClick={handleLogoutClick} className={s.dropdownItem}>
                            Log out
                        </button>
                    </div>
                )}
            </li>
            <li>
                <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick} className={s.cartIcon} />
                {totalItems > 0 && <span className={s.cartBadge}>{totalItems > 99 ? "99+" : totalItems}</span>}
            </li>
        </ul>
    );
}

export default LoginActions;
