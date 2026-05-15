import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main style={styles.page}>
        <div style={styles.overlay}></div>

        <section style={styles.hero}>
          <div style={styles.content}>
            <span style={styles.badge}>✨ AI Powered Travel Planner</span>

            <h1 style={styles.title}>
              Plan Your Dream Trip <br />
              With AI 🌍
            </h1>

            <p style={styles.subtitle}>
              Create complete travel itineraries with hotels, restaurants,
              transport, travel tips and budget estimation — all powered by AI.
            </p>

            <div style={styles.buttonGroup}>
              <button
                style={styles.primaryButton}
                onClick={() => navigate("/create-trip")}
              >
                ✈️ Start Planning
              </button>

              <button
                style={styles.secondaryButton}
                onClick={() => navigate("/my-trips")}
              >
                📍 View My Trips
              </button>
            </div>
          </div>
        </section>

        <section style={styles.featuresSection}>
          <h2 style={styles.featuresTitle}>Why Use AI Trip Planner?</h2>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.icon}>🗺️</div>
              <h3 style={styles.cardTitle}>Smart Itinerary</h3>
              <p style={styles.cardText}>
                Get detailed day-wise travel plans generated intelligently.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.icon}>🏨</div>
              <h3 style={styles.cardTitle}>Hotel Recommendations</h3>
              <p style={styles.cardText}>
                Discover top hotels with pricing, ratings and maps.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.icon}>🍽️</div>
              <h3 style={styles.cardTitle}>Food Suggestions</h3>
              <p style={styles.cardText}>
                Explore famous restaurants and local food experiences.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.icon}>💰</div>
              <h3 style={styles.cardTitle}>Budget Estimation</h3>
              <p style={styles.cardText}>
                AI calculates approximate trip budget for better planning.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(rgba(2,6,23,0.88), rgba(15,23,42,0.92))"
  },

  hero: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "85vh",
    padding: "40px 20px"
  },

  content: {
    maxWidth: "900px"
  },

  badge: {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.2)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#93c5fd",
    fontWeight: "600",
    marginBottom: "24px",
    backdropFilter: "blur(10px)"
  },

  title: {
    fontSize: "72px",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "24px",
    color: "#ffffff"
  },

  subtitle: {
    fontSize: "20px",
    lineHeight: "1.8",
    color: "#cbd5e1",
    marginBottom: "40px",
    maxWidth: "760px",
    marginInline: "auto"
  },

  buttonGroup: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  primaryButton: {
    padding: "16px 34px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(59,130,246,0.35)"
  },

  secondaryButton: {
    padding: "16px 34px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    backdropFilter: "blur(12px)"
  },

  featuresSection: {
    position: "relative",
    zIndex: 2,
    padding: "40px 20px 100px"
  },

  featuresTitle: {
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "800",
    color: "white",
    marginBottom: "50px"
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto"
  },

  featureCard: {
    background: "rgba(15,23,42,0.75)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "30px",
    backdropFilter: "blur(14px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
  },

  icon: {
    fontSize: "42px",
    marginBottom: "20px"
  },

  cardTitle: {
    color: "white",
    fontSize: "24px",
    marginBottom: "14px",
    fontWeight: "700"
  },

  cardText: {
    color: "#cbd5e1",
    lineHeight: "1.7",
    fontSize: "15px"
  }
};

export default Home;