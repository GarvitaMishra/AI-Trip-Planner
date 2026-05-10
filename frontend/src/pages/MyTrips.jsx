import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import TripCard from "../components/TripCard";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trips", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setTrips(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching trips");
      }
    };

    fetchTrips();
  }, []);

  return (
    <>
      <Navbar />
      <style>{responsiveGridStyles}</style>

      <main style={styles.page}>
        <section style={styles.container}>
          <div style={styles.header}>
            <h2 style={styles.title}>My Trips</h2>
            <p style={styles.subtitle}>All your saved travel plans in one place.</p>
          </div>

          {trips.length === 0 ? (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyTitle}>No trips saved yet</h3>
              <p style={styles.emptyText}>
                Your saved itineraries will appear here after you create a trip.
              </p>
            </div>
          ) : (
            <div className="my-trips-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

const responsiveGridStyles = `
  .my-trips-grid {
    display: grid;
    gap: 24px;
  }

  .my-trips-grid.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    .my-trips-grid.md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1280px) {
    .my-trips-grid.xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;

const styles = {
  page: {
    minHeight: "calc(100vh - 72px)",
    background: "#f5f7fa",
    padding: "36px 20px 56px"
  },
  container: {
    width: "min(1180px, 100%)",
    margin: "0 auto"
  },
  header: {
    marginBottom: "24px"
  },
  title: {
    margin: "0 0 8px",
    color: "#0f172a",
    fontSize: "36px",
    lineHeight: "1.15",
    fontWeight: "800"
  },
  subtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "16px"
  },
  emptyState: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
    padding: "32px",
    textAlign: "center"
  },
  emptyTitle: {
    margin: "0 0 8px",
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "800"
  },
  emptyText: {
    margin: 0,
    color: "#64748b",
    fontSize: "15px"
  }
};

export default MyTrips;
