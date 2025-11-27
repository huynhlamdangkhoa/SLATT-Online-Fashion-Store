import "../css/components/Links.css";

function Links() {
    return (
        <ul className="navbar-links">
            <li>
                <a 
                    href="/home"
                    title="Home"
                    style={
                        window.location.pathname === "/home" ||
                        window.location.pathname === "/"
                            ? { fontWeight: "bold" }
                            : {}
                    }
                >
                    Home
                </a>
            </li>
            <li>
                <a
                    href="/products"
                    title="Products"
                    style={
                        window.location.pathname === "/products"
                            ? { fontWeight: "bold" }
                            : {}
                    }
                >
                    Products
                </a>
            </li>
            <li>
                <a
                    href="/about-us"
                    title="About Us"
                    style={
                        window.location.pathname === "/about-us"
                            ? { fontWeight: "bold" }
                            : {}
                    }
                >
                    About Us
                </a>
            </li>
            <li>
                <a
                    href="/contact-us"
                    title="Contact Us"
                    style={
                        window.location.pathname === "/contact-us"
                            ? { fontWeight: "bold" }
                            : {}
                    }
                >
                    Contact Us
                </a>
            </li>
        </ul>
    );
}

export default Links;
