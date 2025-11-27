import { useState } from "react";

import "../css/pages/PasswordReset.css";
import sweetyLogo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";
import { useAuthStore } from "../store/authStore.js";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";

function PasswordReset() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const { resetPassword, error, message, isLoading } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await resetPassword(token, newPassword);

            toast.success(
                "Password reset successfully, redirecting to login page..."
            );
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Error resetting password");
        }
    };

    return (
        <>
            <title>Forgot Password | Sweety</title>

            <div className="page-container password-reset-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Sweety Logo" />
                </a>

                <div className="password-reset-modal">
                    <div className="password-reset-title">
                        <h2>Forgot Password</h2>
                    </div>

                    <form
                        className="password-reset-form"
                        onSubmit={handlePasswordReset}
                    >
                        <label htmlFor="new-password">New Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={newPassword}
                            id="new-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <PasswordStrengthMeter password={newPassword} />

                        <label htmlFor="confirm-new-password">
                            Confirm New Password
                        </label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={confirmNewPassword}
                            id="confirm-new-password"
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                        />

                        <button type="submit" className="password-reset-button">
                            {isLoading ? (
                                <FontAwesomeIcon
                                    className="loading"
                                    icon={faSpinner}
                                />
                            ) : (
                                "Reset Password"
                            )}
                        </button>

                        {error && <p className="error-message">{error}</p>}
                        {message && <p className="message">{message}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default PasswordReset;
