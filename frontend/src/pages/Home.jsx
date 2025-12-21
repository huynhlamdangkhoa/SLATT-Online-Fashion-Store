import "../css/pages/Home.css";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
    return (
        <>
            <title>Home | Sweety </title>

            <div className="page-container home-container">
                <NavBar />
                <section className="hero">
                    <h1 className="hero-title">SLATT</h1>
                    <h2 className="hero-subtitle">Wear Your Vibe</h2>
                    <a href="/products" className="hero-btn">
                        ORDER NOW
                    </a>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default Home;
