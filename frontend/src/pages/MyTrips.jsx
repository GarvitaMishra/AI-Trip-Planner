

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
            <p style={styles.subtitle}>
              All your saved travel plans in one place.
            </p>
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
    minHeight: "100vh",
    padding: "40px 20px",
    backgroundImage:
      "linear-gradient(rgba(13, 13, 13, 0.75), rgba(13, 13, 13, 0.75)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
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
    color: "#ffffff",
    fontSize: "48px",
    lineHeight: "1.15",
    fontWeight: "800"
  },

  subtitle: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "18px"
  },

  emptyState: {
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.4)",
    padding: "32px",
    textAlign: "center",
    backdropFilter: "blur(12px)"
  },

  emptyTitle: {
    margin: "0 0 8px",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "800"
  },

  emptyText: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "15px"
  }
};

export default MyTrips;
