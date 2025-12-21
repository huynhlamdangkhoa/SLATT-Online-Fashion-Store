import "../css/components/DefaultActions.css";

function DefaultActions() {
    return (
        <ul className="navbar-actions">
            <li>
                <a href="/login" className="login-action">
                    Log In
                </a>
            </li>
            <li>
                <a href="/signup" className="signup-action">
                    Sign Up
                </a>
            </li>
        </ul>
    );
}

export default DefaultActions;
