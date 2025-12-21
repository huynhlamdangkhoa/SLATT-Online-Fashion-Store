import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx"; 

function AboutUs() {
    return (
        <>
            <title>About Us | SLATT</title>

            <div className="page-container">
                <NavBar />
                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)", 
                        color: "#f0f0f0",
                        padding: "8rem 2rem",
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
                        Welcome to SLATT
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
                        Where street style meets timeless fashion. We're not just a store – we're a movement.
                    </p>
                </section>

                {/* Our Story */}
                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)", 
                        padding: "6rem 2rem",
                        color: "#f0f0f0",
                        textAlign: "center",
                        backdropFilter: "blur(5px)", 
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "Poppins",
                            fontSize: "2.8rem",
                            marginBottom: "2.5rem",
                        }}
                    >
                        Our Story
                    </h2>
                    <p
                        style={{
                            fontSize: "1.15rem",
                            maxWidth: "900px",
                            margin: "0 auto 2rem",
                            lineHeight: "1.8",
                        }}
                    >
                        Founded in 2025, SLATT was born from a passion for urban fashion and self-expression. We started as a small pop-up shop in Ho Chi Minh City, Vietnam, bringing fresh, bold streetwear to the local scene. Today, we’re proud to serve fashion lovers across the country and beyond.
                    </p>
                    <p
                        style={{
                            fontSize: "1.15rem",
                            maxWidth: "900px",
                            margin: "0 auto",
                            lineHeight: "1.8",
                        }}
                    >
                        Our name "SLATT" stands for "Slay Like A True Trendsetter" – because we believe everyone deserves to stand out with confidence and style.
                    </p>
                </section>

                {/* Our Mission */}
                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)", 
                        padding: "6rem 2rem",
                        color: "#f0f0f0",
                        textAlign: "center",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "Poppins",
                            fontSize: "2.8rem",
                            marginBottom: "2.5rem",
                        }}
                    >
                        Our Mission
                    </h2>
                    <ul
                        style={{
                            listStyle: "none",
                            maxWidth: "800px",
                            margin: "0 auto",
                            fontSize: "1.15rem",
                            lineHeight: "1.8",
                            padding: 0,
                        }}
                    >
                        <li style={{ marginBottom: "1.2rem" }}>• Curate high-quality, affordable streetwear that blends comfort and edge</li>
                        <li style={{ marginBottom: "1.2rem" }}>• Promote individuality and self-expression through unique designs</li>
                        <li style={{ marginBottom: "1.2rem" }}>• Build a community of trendsetters who dare to be different</li>
                        <li>• Focus on sustainable fashion with eco-friendly materials whenever possible</li>
                    </ul>
                </section>

                {/* Closing section */}
                <section
                    style={{
                        backgroundColor: "rgba(17, 17, 17, 0.4)", 
                        padding: "5rem 2rem",
                        color: "#f0f0f0",
                        textAlign: "center",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <p style={{ fontSize: "1.2rem" }}>
                        Thank you for being part of the SLATT family. <br />
                    </p>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default AboutUs;