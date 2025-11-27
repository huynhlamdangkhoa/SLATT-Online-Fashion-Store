import { useState } from "react";

import "../css/pages/PasswordForgot.css";
import sweetyLogo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";
import { useAuthStore } from "../store/authStore.js";

function PasswordForgot() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { forgotPassword, isLoading } = useAuthStore();

    const handlePasswordForgot = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    return (
        <>
            <title>Forgot Password | Sweety</title>

            <div className="page-container password-forgot-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Sweety Logo" />
                </a>

                <div className="password-forgot-modal">
                    <div className="password-forgot-title">
                        <h2>Forgot Password</h2>
                    </div>

                    {!isSubmitted ? (
                        <>
                            {" "}
                            <p className="password-forgot-subtitle">
                                Enter your email address and we'll send you a
                                link to reset your passsword.
                            </p>
                            <form
                                className="password-forgot-form"
                                onSubmit={handlePasswordForgot}
                            >
                                <label htmlFor="">Email</label>
                                <Input
                                    icon={faEnvelope}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                {/* <label htmlFor="">New Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="">Confirm New Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        /> */}

                                <button
                                    type="submit"
                                    className="password-forgot-button"
                                >
                                    {isLoading ? (
                                        <FontAwesomeIcon
                                            className="loading"
                                            icon={faSpinner}
                                        />
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div>
                                <FontAwesomeIcon
                                    className="envelope"
                                    icon={faEnvelope}
                                />
                                <p className="password-forgot-sent">
                                    If an account exists for {email}, you will
                                    receive a password reset link shortly.
                                </p>
                            </div>
                        </>
                    )}

                    <p className="back-to-login">
                        Back to <a href="/login">Log In</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default PasswordForgot;
