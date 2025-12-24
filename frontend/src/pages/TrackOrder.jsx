import { useEffect, useState } from "react";
import s from "../css/pages/TrackOrder.module.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { useOrderStore } from "../store/orderStore.js";

function TrackOrder() {
  const { orders, getOrders, isLoading } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <NavBar />

      <div className={s.orderTrackContainer}>
        <h1>Your Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={s.orderTrackCard}>
              <div className={s.orderTrackSummary}>
                <span>Status: {order.orderStatus}</span>
                <br></br>
                <span>Total: ${order.totalAmount.toFixed(2)}</span>
                <br></br>
                {/* <button
                  onClick={() =>
                    setSelectedOrder(
                      selectedOrder?.id === order.id ? null : order
                    )
                  }
                >
                  {selectedOrder?.id === order.id
                    ? "Hide"
                    : "View"} Details
                </button> */}
              </div>

              {selectedOrder?.id === order.id && (
                <div className={s.orderDetails}>
                  {order.cartItems.map((item) => (
                    <div key={item.id}>
                      {item.product.name} x {item.quantity}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default TrackOrder;
