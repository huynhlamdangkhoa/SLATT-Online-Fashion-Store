import { useState, useEffect } from "react";

import s from "../css/pages/TrackOrder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faTruck,
    faCheckCircle,
    faClock,
    faEye,
    faSpinner,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { useOrderStore } from "../store/orderStore.js";

function TrackOrder() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { orders, getOrders, isLoading } = useOrderStore();

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    const getStatusIcon = (status) => {
        const iconProps = { size: 20, className: "text-amber-400" };

        switch (status) {
            case "placed":
                return <FontAwesomeIcon style={{ color: "#80ef80" }} icon={faCheckCircle} {...iconProps} />;
            case "shipped":
                return <FontAwesomeIcon icon={faTruck} {...iconProps} />;
            case "delivered":
                return <FontAwesomeIcon icon={faBox} {...iconProps} />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(selectedOrder?._id === order._id ? null : order);
    };

    if (isLoading) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    return (
        <>
            <title>Track Orders | Sweety</title>

            <div className="page-container">
                <NavBar />

                <div className={s.orderTrackContainer}>
                    {/* Header */}
                    <div className={s.orderTrackHeader}>
                        <h1>Your Orders</h1>
                        <p>Track all your orders</p>
                    </div>

                    {/* Orders List */}
                    <div className={s.orderTrackList}>
                        {!orders || orders.length === 0 ? (
                            <div className={s.orderTrackNotFoundContainer}>
                                <FontAwesomeIcon icon={faBox} size="3x" className={s.boxIcon} />
                                <h3>No Orders Found</h3>
                                <p>You don't have any orders yet.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className={s.orderTrackCard}>
                                    {/* Order Summary */}
                                    <div className={s.orderTrackSummary}>
                                        <div className={s.orderTrackSummaryWrapper}>
                                            <div className={s.orderTrackStatusContainer}>
                                                <div className={s.orderTrackStatus}>
                                                    {getStatusIcon(order.orderStatus)}
                                                    <span>{order.orderStatus}</span>
                                                </div>
                                                <div className={s.orderTrackLine}></div>
                                                <span className={s.orderTrackId}>{order.trackingId}</span>
                                            </div>

                                            <button
                                                onClick={() => handleViewDetails(order)}
                                                className={s.orderTrackDetailsButton}
                                            >
                                                {selectedOrder?._id === order._id ? (
                                                    <div>
                                                        <FontAwesomeIcon className={s.eyeIcon} icon={faEye} size="sm" />

                                                        <span>Hide Details</span>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <FontAwesomeIcon
                                                            className={s.eyeIcon}
                                                            icon={faEyeSlash}
                                                            size="sm"
                                                        />

                                                        <span>View Details</span>
                                                    </div>
                                                )}
                                            </button>
                                        </div>

                                        <div className={s.orderTrackInfo}>
                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Order Date</p>
                                                <p className={s.orderTrackInfoValue}>{formatDate(order.placedTime)}</p>
                                            </div>

                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Total Quantity</p>
                                                <p className={s.orderTrackInfoValue}>
                                                    {order.totalQuantity} item{order.totalQuantity !== 1 ? "s" : ""}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Total Amount</p>
                                                <p className={s.orderTrackInfoValue}>${order.totalAmount.toFixed(2)}</p>
                                            </div>

                                            <div>
                                                <p className={s.orderTrackInfoLabel}>Delivery Address</p>
                                                <p className={s.orderTrackInfoValue}>{order.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details (Expandable) - ALWAYS RENDERED */}
                                    <div
                                        className={`${s.orderTrackOrderDetailsContainer} ${
                                            selectedOrder?._id === order._id ? s.expanded : ""
                                        }`}
                                    >
                                        <div className={s.orderTrackOrderDetailsWrapper}>
                                            {/* Order Items */}
                                            <div>
                                                <h4 className={s.orderItemsTitle}>Order Items</h4>
                                                <div className={s.orderItemsList}>
                                                    {order.cartItems.map((item, index) => (
                                                        <div key={index} className={s.orderItemCard}>
                                                            <div className={s.orderItemLeft}>
                                                                <div className={s.orderItemImageContainer}>
                                                                    <img
                                                                        src={item.product.imageURL}
                                                                        alt={`${item.product.imageURL}`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h5 className={s.orderItemName}>
                                                                        {item.product.name}
                                                                    </h5>
                                                                    <p className={s.orderItemQuantity}>
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className={s.orderItemPriceContainer}>
                                                                <p className={s.orderItemTotalPrice}>
                                                                    ${(item.price * item.quantity).toFixed(2)}
                                                                </p>
                                                                <p className={s.orderItemUnitPrice}>
                                                                    ${item.price.toFixed(2)} each
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default TrackOrder;
