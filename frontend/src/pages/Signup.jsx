import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import "../css/pages/Signup.css";
import sweetyLogo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faPhone, faUser, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Input from "../components/Input.jsx";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";

import { useAuthStore } from "../store/authStore.js";

function Signup() {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const { signup, error, isLoading, clearError } = useAuthStore();

    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleInputChange = (setter) => (e) => {
        if (error) clearError();
        setter(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        if (error) clearError();
        setPassword(newPassword);

        if (passwordError) setPasswordError("");
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            return;
        }

        try {
            await signup(fullName, phoneNumber, email, password, confirmPassword);
            navigate("/email-verification");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <title>Signup | Sweety</title>

            <div className="page-container signup-container">
                <a href="/home">
                    <img className="logo" src={sweetyLogo} alt="Sweety Logo" />
                </a>

                <div className="signup-modal">
                    <div className="signup-title">
                        <h2>Sign Up</h2>
                    </div>

                    <form className="signup-form" onSubmit={handleSignUp}>
                        <label htmlFor="">Full Name</label>
                        <Input icon={faUser} type="text" value={fullName} onChange={handleInputChange(setFullName)} />

                        <label htmlFor="">Phone Number</label>
                        <Input
                            icon={faPhone}
                            type="tel"
                            value={phoneNumber}
                            onChange={handleInputChange(setPhoneNumber)}
                        />

                        <label htmlFor="">Email</label>
                        <Input icon={faEnvelope} type="text" value={email} onChange={handleInputChange(setEmail)} />

                        <label htmlFor="">Password</label>
                        <Input icon={faKey} type="password" value={password} onChange={handlePasswordChange} />
                        <PasswordStrengthMeter password={password} />

                        <label htmlFor="">Confirm Password</label>
                        <Input
                            icon={faKey}
                            type="password"
                            value={confirmPassword}
                            onChange={handleInputChange(setConfirmPassword)}
                        />

                        {passwordError && <p className="error-message">{passwordError}</p>}
                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="signup-button" disabled={isLoading}>
                            {isLoading ? <FontAwesomeIcon className="loading" icon={faSpinner} /> : "Sign Up"}
                        </button>
                    </form>

                    <p className="signup-account">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Signup;
