import "../css/components/Footer.css";
import Logo from "../assets/logo.svg";

function Footer() {
    return (
        <footer>
            <div className="navbar-brand">
                <img src={Logo} alt="SLATT Logo" />
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
