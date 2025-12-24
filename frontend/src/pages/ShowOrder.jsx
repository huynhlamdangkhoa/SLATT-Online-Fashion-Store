import { useEffect, useState } from "react";
import s from "../css/pages/TrackOrder.module.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import { useOrderStore } from "../store/orderStore.js";
import { useProfileStore } from "../store/profileStore.js";

function ShowOrder() {
  const { profile, getUserProfile } = useProfileStore();
  const { orders, getOrdersAdmin, isLoading } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (profile?.role === "admin") {
      getOrdersAdmin();
    }
  }, [profile]);

  if (!profile || isLoading) {
    return <div className="page-container">Loading...</div>;
  }

  if (profile.role !== "admin") {
    return <div className="page-container">Access Denied</div>;
  }

  return (
    <div className="page-container">
      <NavBar />

      <div className={s.orderTrackContainer}>
        <h1>All Orders</h1>

        {orders.map((order) => (
          <div key={order.id} className={s.orderTrackCard}>
            <div>
              <b>{order.trackingId}</b> – {order.orderStatus}
              <button
                onClick={() =>
                  setSelectedOrder(
                    selectedOrder?.id === order.id ? null : order
                  )
                }
              >
                View
              </button>
            </div>

            {selectedOrder?.id === order.id && (
              <div>
                {order.cartItems.map((item) => (
                  <p key={item.id}>
                    {item.product.name} x {item.quantity}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default ShowOrder;
