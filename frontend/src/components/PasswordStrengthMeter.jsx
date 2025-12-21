import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

import "../css/components/PasswordStrengthMeter.css";

function PasswordStrengthMeter({ password }) {
    if (!password) {
        return null;
    }

    const criteria = [
        { label: "More than 12 characters", met: password.length >= 12 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        {
            label: "Contains special character",
            met: /[^A-Za-z0-9]/.test(password),
        },
    ];

    const getStrengthColor = (metCount) => {
        if (metCount <= 1) return "#ef4444"; // Red
        if (metCount <= 3) return "#f59e0b"; // Yellow
        if (metCount <= 4) return "#3b82f6"; // Blue
        return "#10b981"; // Green
    };

    const getStrengthText = (metCount) => {
        if (metCount <= 1) return "Weak";
        if (metCount <= 3) return "Fair";
        if (metCount <= 4) return "Good";
        return "Strong";
    };

    return (
        <div className="criteria-container">
            <h3 className="criteria-title">Password Suggestions</h3>
            <ul className="criteria-list">
                {criteria.map((criterion, index) => (
                    <li key={index} className="criteria-item">
                        <div className="criteria-icon">
                            {criterion.met ? (
                                <FontAwesomeIcon
                                    size={16}
                                    style={{ color: "#10b981" }}
                                    icon={faCheck}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    size={16}
                                    style={{ color: "#ef4444" }}
                                    icon={faX}
                                />
                            )}
                        </div>

                        <span
                            className="criteria-text"
                            style={{
                                color: criterion.met ? "#10b981" : "#6b7280",
                            }}
                        >
                            {criterion.label}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="strength-meter">
                <div className="strength-label">Password Strength</div>
                <div className="strength-bar">
                    <div
                        className="strength-fill"
                        style={{
                            width: `${
                                (criteria.filter((c) => c.met).length /
                                    criteria.length) *
                                100
                            }%`,
                            backgroundColor: getStrengthColor(
                                criteria.filter((c) => c.met).length
                            ),
                        }}
                    ></div>
                    <span className="strength-text">
                        {getStrengthText(criteria.filter((c) => c.met).length)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PasswordStrengthMeter;
