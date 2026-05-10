function TripCard({ trip }) {
  const itinerary = trip.plan?.itinerary || [];

  return (
    <article style={styles.card}>
      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>Saved trip</p>
          <h3 style={styles.title}>{trip.destination}</h3>
        </div>
      </div>

      <div style={styles.metaGrid}>
        <TripInfo label="Days" value={trip.days} />
        <TripInfo label="Budget" value={`Rs. ${trip.budget}`} />
        <TripInfo label="Type" value={trip.people} />
      </div>

      {itinerary.length > 0 && (
        <div style={styles.itinerary}>
          <h4 style={styles.sectionTitle}>Itinerary</h4>

          <div style={styles.dayList}>
            {itinerary.map((day, i) => (
              <div key={i} style={styles.dayItem}>
                <strong style={styles.dayLabel}>Day {day.day}</strong>
                <p style={styles.dayPlan}>{day.plan}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function TripInfo({ label, value }) {
  return (
    <div style={styles.metaItem}>
      <span style={styles.metaValue}>{value}</span>
      <span style={styles.metaLabel}>{label}</span>
    </div>
  );
}

const styles = {
  card: {
    height: "100%",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px"
  },
  eyebrow: {
    margin: "0 0 6px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0",
    textTransform: "uppercase"
  },
  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: "24px",
    lineHeight: "1.2",
    fontWeight: "800"
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))",
    gap: "10px"
  },
  metaItem: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "12px"
  },
  metaValue: {
    display: "block",
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: "800",
    lineHeight: "1.3",
    wordBreak: "break-word"
  },
  metaLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "12px",
    marginTop: "4px"
  },
  itinerary: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  sectionTitle: {
    margin: 0,
    color: "#334155",
    fontSize: "16px",
    fontWeight: "800"
  },
  dayList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  dayItem: {
    borderLeft: "3px solid #2563eb",
    background: "#f8fafc",
    borderRadius: "0 8px 8px 0",
    padding: "10px 12px"
  },
  dayLabel: {
    display: "block",
    color: "#0f172a",
    fontSize: "14px",
    marginBottom: "4px"
  },
  dayPlan: {
    margin: 0,
    color: "#475569",
    fontSize: "14px",
    lineHeight: "1.6"
  }
};

export default TripCard;
