import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function TripCard({ trip }) {
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/trips/${trip._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Trip deleted");

      window.location.reload();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete trip");
    }
  };

 // const heroImage = `https://source.unsplash.com/1600x900/?${trip.destination},tourism,travel,city`;
 const heroImage = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80&t=${trip.destination}`;

  return (
    <article style={styles.card}>
      {/* HERO SECTION */}

      <div style={styles.hero}>
        <img
          src={heroImage}
          alt={trip.destination}
          style={styles.heroImage}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
          }}
        />

        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>
          <p style={styles.badge}>Saved Trip</p>

          <h2 style={styles.title}>{trip.destination}</h2>

          <div style={styles.metaRow}>
            <span>🗓️ {trip.days} Days</span>
            <span>👥 {trip.people}</span>
            <span>💰 ₹{trip.budget}</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}

      <div style={styles.actions}>
        <button
          style={styles.viewBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Details" : "View Full Trip"}
        </button>

        <button style={styles.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* CONTENT */}

      {expanded && (
        <div style={styles.content}>

          {/* ITINERARY */}

          {trip.plan?.itinerary?.length > 0 && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🗓️ Day Wise Plan</h3>

              <div style={styles.dayGrid}>
                {trip.plan.itinerary.map((day, index) => (
                  <div key={index} style={styles.dayCard}>
                    <h4 style={styles.dayTitle}>
                      Day {day.day}: {day.title}
                    </h4>

                    <p style={styles.fullPlan}>
                      {day.plan}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* HOTELS */}

          {trip.plan?.hotels?.length > 0 && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🏨 Recommended Hotels</h3>

              <div style={styles.grid}>
                {trip.plan.hotels.map((hotel, index) => (
                  <div key={index} style={styles.infoCard}>
                    {/* <img
                      src={
                        hotel.image ||
                        `https://source.unsplash.com/600x400/?${hotel.name},hotel,${trip.destination}`
                      }
                      alt={hotel.name}
                      style={styles.image}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945";
                      }}
                    />     */}

                    <img
                      src={
                        hotel.image ||
                        `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80&t=${hotel.name}${index}`
                      }
                      alt={hotel.name}
                      style={styles.image}
                    />

                    <div style={styles.cardContent}>
                      <h4 style={styles.cardTitle}>{hotel.name}</h4>

                      <p style={styles.cardText}>
                        📍 {hotel.address}
                      </p>

                      <p style={styles.cardText}>
                        ⭐ {hotel.rating}
                      </p>

                      <p style={styles.price}>
                        💰 {hotel.price}
                      </p>

                      <a
                        href={hotel.link}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        View on Maps →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FOOD */}

          {trip.plan?.food?.length > 0 && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🍽️ Best Food Places</h3>

              <div style={styles.grid}>
                {trip.plan.food.map((food, index) => (
                  <div key={index} style={styles.infoCard}>
                    {/* <img
                      src={
                        food.image ||
                        `https://source.unsplash.com/600x400/?${food.name},restaurant,food`
                      }
                      alt={food.name}
                      style={styles.image}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";
                      }}
                    /> */}

                    <img
                      src={
                        food.image ||
                        `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80&t=${food.name}${index}`
                      }
                      alt={food.name}
                      style={styles.image}
                    />


                    <div style={styles.cardContent}>
                      <h4 style={styles.cardTitle}>{food.name}</h4>

                      <p style={styles.cardText}>
                        📍 {food.address}
                      </p>

                      <p style={styles.cardText}>
                        🍴 Famous for: {food.famousFor}
                      </p>

                      <p style={styles.cardText}>
                        ⭐ {food.rating}
                      </p>

                      <p style={styles.price}>
                        💰 {food.cost}
                      </p>

                      <a
                        href={food.link}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        View on Maps →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TRANSPORT */}

          {trip.plan?.transport?.length > 0 && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>🚕 Transport Guide</h3>

              <div style={styles.grid}>
                {trip.plan.transport.map((item, index) => (
                  <div key={index} style={styles.infoCard}>
                    <div style={styles.cardContent}>
                      <h4 style={styles.cardTitle}>{item.type}</h4>

                      <p style={styles.cardText}>
                        {item.details}
                      </p>

                      <p style={styles.price}>
                        💰 {item.cost}
                      </p>

                      {item.tips && (
                        <p style={styles.cardText}>
                          💡 {item.tips}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TIPS */}

          {trip.plan?.tips?.length > 0 && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>💡 Travel Tips</h3>

              <div style={styles.tipBox}>
                {trip.plan.tips.map((tip, index) => (
                  <p key={index} style={styles.tip}>
                    • {tip}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* BUDGET */}

          {trip.plan?.estimatedBudget && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>💰 Budget Breakdown</h3>

              <div style={styles.budgetCard}>
                <div style={styles.budgetRow}>
                  <span>🏨 Hotel</span>
                  <span>{trip.plan.estimatedBudget.hotel}</span>
                </div>

                <div style={styles.budgetRow}>
                  <span>🍽️ Food</span>
                  <span>{trip.plan.estimatedBudget.food}</span>
                </div>

                <div style={styles.budgetRow}>
                  <span>🚕 Transport</span>
                  <span>{trip.plan.estimatedBudget.transport}</span>
                </div>

                <div style={styles.budgetRow}>
                  <span>🎟️ Activities</span>
                  <span>{trip.plan.estimatedBudget.activities}</span>
                </div>

                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>{trip.plan.estimatedBudget.total}</span>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </article>
  );
}

const styles = {
  card: {
    background: "#0f172a",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "30px",
  },

  hero: {
    position: "relative",
    height: "300px",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.2))",
  },

  heroContent: {
    position: "absolute",
    bottom: "25px",
    left: "25px",
    color: "white",
    zIndex: 2,
  },

  badge: {
    background: "#2563eb",
    padding: "8px 14px",
    borderRadius: "999px",
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  title: {
    margin: 0,
    fontSize: "42px",
    fontWeight: "800",
    textTransform: "capitalize",
  },

  metaRow: {
    display: "flex",
    gap: "16px",
    marginTop: "14px",
    flexWrap: "wrap",
    fontSize: "15px",
    color: "#e2e8f0",
  },

  actions: {
    display: "flex",
    gap: "14px",
    padding: "22px",
    background: "#111827",
  },

  viewBtn: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(to right,#2563eb,#38bdf8)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  deleteBtn: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  content: {
    padding: "25px",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "30px",
    color: "#ffffff",
    fontWeight: "800",
  },

  dayGrid: {
    display: "grid",
    gap: "20px",
  },

  dayCard: {
    background: "#1e293b",
    padding: "22px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#ffffff",
  },

  dayTitle: {
    marginBottom: "16px",
    fontSize: "22px",
  },

  dayContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#cbd5e1",
    lineHeight: "1.7",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "24px",
  },

  infoCard: {
    background: "#1e293b",
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#ffffff",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  cardContent: {
    padding: "20px",
  },

  cardTitle: {
    margin: "0 0 12px",
    fontSize: "24px",
    fontWeight: "700",
  },

  cardText: {
    margin: "8px 0",
    color: "#cbd5e1",
    lineHeight: "1.6",
  },

  price: {
    color: "#38bdf8",
    fontWeight: "bold",
    marginTop: "12px",
  },

  link: {
    display: "inline-block",
    marginTop: "14px",
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "bold",
  },

  tipBox: {
    background: "#1e293b",
    padding: "22px",
    borderRadius: "20px",
    color: "#e2e8f0",
    lineHeight: "1.9",
  },

  tip: {
    margin: "10px 0",
  },

  budgetCard: {
    background: "#1e293b",
    padding: "24px",
    borderRadius: "20px",
    color: "#faf8f8",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  budgetRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#d2d9e2",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingBottom: "10px",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#38bff8",
  },

  fullPlan: {
    color: "#f8faf9",
    lineHeight: "1.9",
    fontSize: "16px",
    marginTop: "12px",
  },

};

export default TripCard;