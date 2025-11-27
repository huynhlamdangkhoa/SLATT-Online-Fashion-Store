import "../css/components/Footer.css";
import sweetyLogo from "../assets/logo.svg";

function Footer() {
    return (
        <footer>
            <div className="navbar-brand">
                <img src={sweetyLogo} alt="SLATT Logo" />
            </div>
            <div className="copyright">
                <p>
                    Copyright &copy; 2025 <strong>SALTT</strong>. All rights
                    reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
