import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

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
      alert("Error fetching trips");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>📌 My Trips</h2>

        {trips.length === 0 ? (
          <p>No trips saved yet</p>
        ) : (
          trips.map((trip) => (
            <div key={trip._id} style={styles.card}>
              <h3>{trip.destination}</h3>
              <p>Days: {trip.days}</p>
              <p>Budget: ₹{trip.budget}</p>
              <p>Type: {trip.people}</p>

              {/* Show itinerary */}
              {trip.plan?.itinerary?.map((day, i) => (
                <div key={i}>
                  <strong>Day {day.day}:</strong> {day.plan}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  }
};

export default MyTrips;