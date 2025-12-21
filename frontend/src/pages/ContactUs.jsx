import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function ContactUs() {
    return (
        <>
            <title>Contact Us | SLATT</title>

            <div className="page-container">
                <NavBar />
                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)", 
                        color: "#f0f0f0",
                        padding: "8rem 2rem 6rem",
                        textAlign: "center",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "Poppins",
                            fontSize: "4rem",
                            fontWeight: "bold",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Get in Touch
                    </h1>
                    <p
                        style={{
                            fontSize: "1.3rem",
                            maxWidth: "800px",
                            margin: "0 auto",
                            lineHeight: "1.7",
                            color: "#ddd",
                        }}
                    >
                        We're here to help and answer any questions you might have. <br />
                        We look forward to hearing from you!
                    </p>
                </section>

                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)",
                        padding: "6rem 2rem",
                        color: "#f0f0f0",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1000px",
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "3rem",
                            textAlign: "center",
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "1.8rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Email
                            </h3>
                            <p style={{ fontSize: "1.15rem", color: "#ccc" }}>
                                <a
                                    href="mailto:support@slatt.vn"
                                    style={{ color: "#f0f0f0", textDecoration: "none" }}
                                >
                                    support@slatt.vn
                                </a>
                            </p>
                            <p style={{ fontSize: "1rem", color: "#aaa", marginTop: "0.5rem" }}>
                                General inquiries & customer support
                            </p>
                        </div>

                        <div>
                            <h3
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "1.8rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Phone
                            </h3>
                            <p style={{ fontSize: "1.15rem", color: "#ccc" }}>
                                <a
                                    href="tel:+84234567890"
                                    style={{ color: "#f0f0f0", textDecoration: "none" }}
                                >
                                    +84 234 567 890
                                </a>
                            </p>
                            <p style={{ fontSize: "1rem", color: "#aaa", marginTop: "0.5rem" }}>
                                Mon - Fri: 9:00 AM - 6:00 PM (GMT+7)
                            </p>
                        </div>
                        <div>
                            <h3
                                style={{
                                    fontFamily: "Poppins",
                                    fontSize: "1.8rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Visit Us
                            </h3>
                            <p style={{ fontSize: "1.15rem", color: "#ccc", lineHeight: "1.6" }}>
                                123 Fashion Street<br />
                                District 1, Ho Chi Minh City<br />
                                Vietnam
                            </p>
                            <p style={{ fontSize: "1rem", color: "#aaa", marginTop: "0.5rem" }}>
                                Flagship Store & Headquarters
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)",
                        padding: "5rem 2rem",
                        textAlign: "center",
                        color: "#aaa",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <h3 style={{ fontFamily: "Poppins", color: "#f0f0f0", fontSize: "1.8rem", marginBottom: "2rem" }}>
                        Follow Us
                    </h3>
                    <div style={{ fontSize: "2rem", display: "flex", justifyContent: "center", gap: "2rem" }}>
                        <a href="#" style={{ color: "#f0f0f0", textDecoration: "none" }}>Instagram</a>
                        <a href="#" style={{ color: "#f0f0f0", textDecoration: "none" }}>TikTok</a>
                        <a href="#" style={{ color: "#f0f0f0", textDecoration: "none" }}>Facebook</a>
                    </div>
                    <p style={{ marginTop: "3rem", fontSize: "1.2rem" }}>
                        Stay connected and be the first to know about new drops! 
                    </p>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default ContactUs;