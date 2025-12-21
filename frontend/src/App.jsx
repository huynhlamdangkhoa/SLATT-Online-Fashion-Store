import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

import "./css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PasswordForgot from "./pages/PasswordForgot.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import { useAuthStore } from "./store/authStore.js";
import ShowOrder from "./pages/ShowOrder.jsx";
import NewProduct from "./pages/NewProduct.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !user.isVerified) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    if (isAuthenticated && user.isVerified) {
        return <Navigate to={"/home"} replace />;
    }

    return children;
};

const RedirectNonAdminUser = ({ children }) => {
    const { isAuthenticated, isCheckingAuth, user } = useAuthStore();

    // Show loading while checking authentication or if user is null
    if (isCheckingAuth || !user) {
        return (
            <div className="page-container">
                <div className="loading-layout">
                    <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has admin role (user is guaranteed to exist here)
    if (user.role !== "admin") {
        toast.error("You are unauthorized to access this functionality");
        return <Navigate to="/home" replace />;
    }

    return children;
};

function App() {
    const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/track-order"
                    element={
                        <ProtectedRoute>
                            <TrackOrder />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/show-orders"
                    element={
                        <RedirectNonAdminUser>
                            <ShowOrder />
                        </RedirectNonAdminUser>
                    }
                />{" "}
                <Route
                    path="/new-product"
                    element={
                        <RedirectNonAdminUser>
                            <NewProduct />
                        </RedirectNonAdminUser>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectAuthenticatedUser>
                            <Login />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <RedirectAuthenticatedUser>
                            <Signup />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route path="/password-forgot" element={<PasswordForgot />} />
            </Routes>
            <Toaster
                toastOptions={{
                    style: {
                        fontFamily: "Poppins",
                    },
                }}
            />
        </>
    );
}

export default App;
