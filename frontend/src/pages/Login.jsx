import { useState } from "react";

import "../css/pages/Login.css";
import sweetyLogo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";
import { useAuthStore } from "../store/authStore.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <>
            <title>Login | Sweety</title>

            <div className="page-container login-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Logo" />
                </a>

                <div className="login-modal">
                    <div className="login-title">
                        <h1>Login</h1>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleLogin}
                    >
                        <label htmlFor="">Email</label>
                        <Input
                            icon={faEnvelope}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="">Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="login-options">
                            <div className="login-remember">
                                <input id="rememberMe" type="checkbox" />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

                            <a href="/password-forgot">Forgot password?</a>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="login-button">
                            {isLoading ? (
                                <FontAwesomeIcon
                                    className="loading"
                                    icon={faSpinner}
                                />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="login-no-account">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
