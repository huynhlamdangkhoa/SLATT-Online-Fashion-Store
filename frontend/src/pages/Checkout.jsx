import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import s from "../css/pages/Checkout.module.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import { useProfileStore } from "../store/profileStore.js";
import { useCartStore } from "../store/cartStore.js";
import { useOrderStore } from "../store/orderStore.js";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { profile, getUserProfile } = useProfileStore();
  const { cartItems, getCartItems, clearCart } = useCartStore();
  const { placeTheOrder, isLoading } = useOrderStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  if (!location.state?.fromCart) {
    return <Navigate to="/cart" replace />;
  }

  // Load profile & cart items khi component mount
  useEffect(() => {
    getUserProfile();
    getCartItems();
  }, []);


  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      },
      subtotal,
    };

    try {
  await placeTheOrder(orderData);

  toast.success("Placed order successfully!");
  navigate("/track-order", { replace: true });
  } catch (err) {
    console.error("Place order error:", err);
    toast.error("Failed to place order!");
    return;
  }

  try {
    clearCart();
  } catch (err) {
    console.warn("Clear cart failed:", err);
  }

    
  };

  return (
    <div className="page-container">
      <NavBar />

      <div className={s.checkoutModal}>
        <h2>DELIVERY INFORMATION</h2>

        <div className={s.checkoutInfoContainer}>
          <p><b>Full Name:</b> {formData.fullName}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>Phone:</b> {formData.phoneNumber}</p>
          <p><b>Address:</b> {formData.address}</p>
        </div>

        <h2>ORDER DETAILS</h2>

        <div className={s.checkoutOrderContainer}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={s.checkoutOrderRow}>
                <span>
                  {item.quantity} x {item.Product?.name || "Không có tên"}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}

          <div className={s.checkoutSubtotalRow}>
            <b>Subtotal</b>
            <b>${subtotal.toFixed(2)}</b>
          </div>
        </div>

        <button
          disabled={
            !formData.address ||
            !formData.phoneNumber ||
            isLoading ||
            cartItems.length === 0
          }
          className={s.checkoutButton}
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
