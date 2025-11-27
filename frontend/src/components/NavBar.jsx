import "../css/components/NavBar.css";

import sweetyLogo from "../assets/logo.svg";

import Links from "./Links.jsx";
import LoginActions from "./LoginActions.jsx";
import DefaultActions from "./DefaultActions.jsx";
import { useAuthStore } from "../store/authStore.js";

function NavBar() {
    const { isAuthenticated, isCheckingAuth } = useAuthStore();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/home">
                    <img src={sweetyLogo} alt="Logo" />
                </a>
            </div>

            <Links />

            {isCheckingAuth ? (
                <div className="navbar-loading">
                    <div className="loading-placeholder"></div>
                </div>
            ) : isAuthenticated ? (
                <LoginActions />
            ) : (
                <DefaultActions />
            )}
        </nav>
    );
}

export default NavBar;
