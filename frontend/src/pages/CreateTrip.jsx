
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState("");
  const [type, setType] = useState("");

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ================= GENERATE =================

  const handleGenerate = async () => {
    if (!destination || !days || !budget || !people || !type) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setTrip(null);

      // Check for a local free API Key (Google Gemini API offers a generous free tier)
      // Add VITE_GEMINI_API_KEY=your_key_here to your frontend .env.local file
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

      let generatedTrip;

      if (GEMINI_API_KEY) {
        // OPTION 1: Direct Free AI Model Generation (Frontend)
        const prompt = `You are an expert AI Travel Planner. Generate a highly detailed and realistic travel itinerary strictly based on these inputs:
Destination: ${destination}
Duration: ${days} days
Budget: ₹${budget}
Travelers: ${people}
Trip Type: ${type}

Return ONLY a valid JSON object matching the exact structure below. No markdown formatting (\`\`\`json).
{
  "destination": "${destination}",
  "days": ${days},
  "budget": "${budget}",
  "people": "${people}",
  "type": "${type}",
  "itinerary": [{ "day": 1, "title": "Day Title", "plan": "Detailed activities tailored to the destination" }],
  "hotels": [{ "name": "Hotel Name", "address": "Realistic Address", "price": "Price", "rating": "Rating", "link": "https://maps.google.com/?q=hotel+name" }],
  "food": [{ "name": "Restaurant Name", "address": "Realistic Address", "cost": "Cost", "famousFor": "Signature dish", "link": "https://maps.google.com/?q=restaurant+name" }],
  "transport": [{ "type": "Transport Mode", "details": "How to get around", "cost": "Estimated Cost" }],
  "tips": ["Tip 1", "Tip 2"],
  "estimatedBudget": { "hotel": "...", "food": "...", "transport": "...", "activities": "...", "total": "..." }
}`;

        const aiRes = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.4,
            },
          }
        );

        const aiText = aiRes.data.candidates[0].content.parts[0].text;
        generatedTrip = JSON.parse(aiText);
      } else {
        // OPTION 2: Fallback to your Node.js Backend API
        const res = await axios.post(
          "http://localhost:5000/api/ai/generate",
          { destination, days, budget, people, type },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        generatedTrip = res.data.trip;
      }

      // Fallback Safety Check for Map Rendering
      generatedTrip.destination = generatedTrip.destination || destination;
      generatedTrip.itinerary = Array.isArray(generatedTrip.itinerary) ? generatedTrip.itinerary : [];
      generatedTrip.hotels = Array.isArray(generatedTrip.hotels) ? generatedTrip.hotels : [];
      generatedTrip.food = Array.isArray(generatedTrip.food) ? generatedTrip.food : [];
      generatedTrip.transport = Array.isArray(generatedTrip.transport) ? generatedTrip.transport : [];
      generatedTrip.tips = Array.isArray(generatedTrip.tips) ? generatedTrip.tips : [];

      setTrip(generatedTrip);
      toast.success("Trip generated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  // ================= SAVE =================

  const handleSaveTrip = async () => {
    if (!trip) {
      toast.error("Generate a trip first");
      return;
    }

    try {
      setSaving(true);

      const res = await axios.post(
        "http://localhost:5000/api/trips",
        {
          destination,
          days,
          budget,
          people,
          type,
          plan: trip,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(res.data);
      toast.success("Trip saved successfully");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error?.response?.data?.message || "Failed to save trip");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.overlay}></div>

        <div style={styles.container}>
          <div style={styles.hero}>
            <h1 style={styles.title}> Create Your Dream Trip</h1>

            <p style={styles.subtitle}>
              Smart AI travel planner with itinerary, hotels, food, transport,
              travel tips and budget estimation.
            </p>
          </div>

          {/* FORM */}

          <div style={styles.form}>
            <input
              style={styles.input}
              placeholder="Destination (Paris, Goa, Bali...)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <input
              style={styles.input}
              type="number"
              placeholder="Number of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />

            <input
              style={styles.input}
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <select
              style={styles.input}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            >
              <option value="">Select Travelers</option>
              <option value="Solo">Solo</option>
              <option value="Couple">Couple</option>
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
            </select>

            <select
              style={styles.input}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Trip Type</option>
              <option value="India">India</option>
              <option value="International">International</option>
            </select>

            <button
              style={styles.generateBtn}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating AI Trip..." : "Generate AI Trip"}
            </button>

            {trip && (
              <button
                style={styles.saveBtn}
                onClick={handleSaveTrip}
                disabled={saving}
              >
                {saving ? "Saving Trip..." : "Save Trip"}
              </button>
            )}
          </div>

          {/* LOADING */}

          {loading && (
            <div style={styles.loadingBox}>
              <h2>🤖 AI is planning your journey...</h2>
              <p>Generating hotels, itinerary, restaurants and more...</p>
            </div>
          )}

          {/* RESULTS */}

          {trip && (
            <div style={styles.resultContainer}>
              {/* ITINERARY */}

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>🗓️ Itinerary</h2>

                {trip.itinerary?.map((day, index) => (
                  <div key={index} style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      Day {day.day}: {day.title}
                    </h3>
                    <p style={styles.text}>{day.plan}</p>
                  </div>
                ))}
              </section>

              {/* HOTELS */}

              {trip.hotels?.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>🏨 Recommended Hotels</h2>

                  <div style={styles.grid}>
                    {trip.hotels.map((hotel, index) => (
                      <div key={index} style={styles.card}>
                        {/* <img
                          src={`https://source.unsplash.com/600x400/?${hotel.name},hotel,${destination}`}
                          alt={hotel.name}
                          style={styles.image}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1566073771259-6a8506099945";
                          }}
                        />     */}

                        <img
                          src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80&t=${hotel.name}${index}`}
                          alt={hotel.name}
                          style={styles.image}
                        />

                        <h3 style={styles.cardTitle}>{hotel.name}</h3>
                        <p>{hotel.address}</p>
                        <p>⭐ {hotel.rating}</p>
                        <p>💰 {hotel.price}</p>

                        <a
                          href={hotel.link}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          View on Maps →
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FOOD */}

              {trip.food?.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>🍽️ Best Food Places</h2>

                  <div style={styles.grid}>
                    {trip.food.map((food, index) => (
                      <div key={index} style={styles.card}>
                        {/* <img
                          src={`https://source.unsplash.com/600x400/?${food.name},restaurant,food,${destination}`}
                          alt={food.name}
                          style={styles.image}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";
                          }}
                        /> */}

                        <img
                          src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80&t=${food.name}${index}`}
                          alt={food.name}
                          style={styles.image}
                        />

                        <h3 style={styles.cardTitle}>{food.name}</h3>
                        <p>{food.address}</p>
                        <p>💰 {food.cost}</p>
                        <p>🍴 {food.famousFor}</p>

                        <a
                          href={food.link}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          View on Maps →
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* TRANSPORT */}

              {trip.transport?.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>🚖 Transport</h2>

                  <div style={styles.grid}>
                    {trip.transport.map((item, index) => (
                      <div key={index} style={styles.card}>
                        <h3 style={styles.cardTitle}>{item.type}</h3>
                        <p>{item.details}</p>
                        <p>💰 {item.cost}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* TIPS */}

              {trip.tips?.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>📝 Travel Tips</h2>

                  <div style={styles.card}>
                    {trip.tips.map((tip, index) => (
                      <p key={index} style={{ marginBottom: "10px" }}>
                        • {tip}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {/* BUDGET */}

              {trip.estimatedBudget && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>💰 Budget Breakdown</h2>

                  <div style={styles.card}>
                    <p>🏨 Hotel: {trip.estimatedBudget.hotel}</p>
                    <p>🍽️ Food: {trip.estimatedBudget.food}</p>
                    <p>🚕 Transport: {trip.estimatedBudget.transport}</p>
                    <p>🎯 Activities: {trip.estimatedBudget.activities}</p>

                    <h3 style={{ marginTop: "15px" }}>
                      Total: {trip.estimatedBudget.total}
                    </h3>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(13, 13, 13, 0.75)",
  },
  container: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1200px",
    margin: "auto",
    padding: "30px 20px",
    color: "white",
  },
  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#c8c2c2",
    maxWidth: "700px",
    margin: "auto",
  },
  form: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "40px",
  },
  input: {
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    background: "rgb(39, 39, 39)",
    color: "white",
    fontSize: "16px",
  },
  generateBtn: {
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right, #1e418e, #2b5b96)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right, #7d1515, #c52222)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loadingBox: {
    textAlign: "center",
    background: "rgba(20, 38, 112, 0.88)",
    padding: "30px",
    borderRadius: "20px",
  },
  resultContainer: {
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
    fontSize: "32px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    color: "#21397a",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(210, 4, 4, 0.3)",
  },
  cardTitle: {
    marginBottom: "12px",
    fontSize: "22px",
  },
  text: {
    lineHeight: "1.8",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "15px",
    marginBottom: "15px",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#a30404",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default CreateTrip;