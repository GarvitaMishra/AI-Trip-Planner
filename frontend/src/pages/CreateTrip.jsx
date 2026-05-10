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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/ai/generate",
        { destination, days, budget, people, type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error generating trip");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/trips",
        {
          destination,
          days,
          budget,
          type,
          people,
          plan: data // FULL AI response
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Trip saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error saving trip");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Create Your Trip ✈️</h2>

        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <select onChange={(e) => setPeople(e.target.value)}>
          <option value="">Select People</option>
          <option value="Solo">Solo</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
        </select>

        <select onChange={(e) => setType(e.target.value)}>
          <option value="">Trip Type</option>
          <option value="India">India</option>
          <option value="International">International</option>
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Plan"}
        </button>

        {data && (
          <>
            <button onClick ={handleSaveTrip}>Save Trip</button>
            <div style={styles.result}>
              {/* ITINERARY */}
              {data.itinerary?.map((day, i) => (
                <div key={i} style={styles.card}>
                  <h3>Day {day.day}</h3>
                  <p>{day.plan}</p>
                </div>
              ))}

              {/* BUDGET */}
              {data.estimatedBudget && (
                <div style={styles.card}>
                  <h3>💰 Estimated Budget</h3>
                  <p>{data.estimatedBudget}</p>
                </div>
              )}

              {/* HOTELS */}
              {data.hotels?.length > 0 && (
                <div style={styles.card}>
                  <h3>🏨 Hotels</h3>
                  {data.hotels?.map((hotel, i) => {
                    const mapLink = `https://www.google.com/maps/search/?api=1&query=${hotel.name} ${destination}`;
                    const imageUrl = `https://source.unsplash.com/400x250/?hotel,${hotel.name}`;
                    return (
                      <div key={i} style={styles.card}>
                        
                        {/* 🖼️ HOTEL IMAGE */}
                        <img
                          src={imageUrl}
                          alt={hotel.name}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "10px"
                          }}
                        />


                        <h3>{hotel.name}</h3>
                        <p>{hotel.address}</p>
                        <p>⭐ {hotel.rating}</p>

                        <a href={mapLink} target="_blank" rel="noopener noreferrer">
                          🔗 View on Google Maps
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* FOOD */}
              {data.food?.length > 0 && (
                <div style={styles.card}>
                  <h3>🍽️ Food</h3>
                  {data.food?.map((item, i) => {
                    const link = `https://www.google.com/maps/search/?api=1&query=${item.name} ${destination}`;
                    const imageUrl = `https://source.unsplash.com/400x250/?restaurant,food,${item.name}`;

                    return (
                      <div key={i} style={styles.card}>

                          {/* 🖼️ FOOD IMAGE */}
                        <img
                          src={imageUrl}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "10px"
                          }}
                        />


                        <h3>{item.name}</h3>
                        <p>{item.address}</p>
                        <p>💰 {item.cost}</p>

                        <a href={link} target="_blank" rel="noopener noreferrer">
                          🔗 View on Maps
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TRANSPORT */}
              {data.transport?.length > 0 && (
                <div style={styles.card}>
                  <h3>🚗 Transport</h3>
                  {data.transport?.map((t, i) => {
                    const link = `https://www.google.com/search?q=${t.type} in ${destination}`;

                    return (
                      <div key={i} style={styles.card}>
                        <h3>{t.type}</h3>
                        <p>{t.details}</p>
                        <p>💰 {t.cost}</p>

                        <a href={link} target="_blank" rel="noopener noreferrer">
                          🔗 Search Transport
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TIPS */}
              {data.tips?.length > 0 && (
                <div style={styles.card}>
                  <h3>📝 Tips</h3>
                  {data.tips.map((tip, i) => (
                    <p key={i}>• {tip}</p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
    margin: "auto",
  },
  result: {
    marginTop: "20px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default CreateTrip;













// import { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// function CreateTrip() {
//   const [destination, setDestination] = useState("");
//   const [days, setDays] = useState("");
//   const [budget, setBudget] = useState("");
//   const [people, setPeople] = useState("");
//   const [type, setType] = useState("");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);

//       console.log({ destination, days, budget, people, type });

//       const res = await axios.post(
//         "http://localhost:5000/api/ai/generate",
//         { destination, days, budget, people, type },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setData(res.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Error generating trip");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveTrip = async () => {
//     if (!data) {
//       toast.error("Generate trip first!");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/trips",
//         {
//           destination,
//           days,
//           budget,
//           type,
//           people,
//           itinerary: data // ✅ FULL AI RESPONSE SAVED
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       toast.success("Trip saved successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error("Error saving trip");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div style={styles.container}>
//         <h2>Create Your Trip ✈️</h2>

//         <input
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Days"
//           value={days}
//           onChange={(e) => setDays(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Budget (₹)"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//         />

//         <select onChange={(e) => setPeople(e.target.value)}>
//           <option value="">Select People</option>
//           <option value="Solo">Solo</option>
//           <option value="Family">Family</option>
//           <option value="Friends">Friends</option>
//         </select>

//         <select onChange={(e) => setType(e.target.value)}>
//           <option value="">Trip Type</option>
//           <option value="India">India</option>
//           <option value="International">International</option>
//         </select>

//         <button onClick={handleGenerate} disabled={loading}>
//           {loading ? "Generating..." : "Generate Plan"}
//         </button>

//         {data && (
//           <>
//             <button onClick={handleSaveTrip}>Save Trip</button>

//             <div style={styles.result}>
//               {/* ITINERARY */}
//               {data.itinerary?.map((day, i) => (
//                 <div key={i} style={styles.card}>
//                   <h3>Day {day.day}</h3>
//                   <p>{day.plan}</p>
//                 </div>
//               ))}

//               {/* BUDGET */}
//               {data.estimatedBudget && (
//                 <div style={styles.card}>
//                   <h3>💰 Estimated Budget</h3>
//                   <p>{data.estimatedBudget}</p>
//                 </div>
//               )}

//               {/* HOTELS */}
//               {data.hotels?.length > 0 && (
//                 <div style={styles.card}>
//                   <h3>🏨 Hotels</h3>
//                   {data.hotels.map((hotel, i) => {
//                     const mapLink = `https://www.google.com/maps/search/?api=1&query=${hotel.name} ${destination}`;
//                     const imageUrl = `https://source.unsplash.com/400x250/?hotel,${hotel.name}`;

//                     return (
//                       <div key={i} style={styles.card}>
//                         <img
//                           src={imageUrl}
//                           alt={hotel.name}
//                           style={{
//                             width: "100%",
//                             height: "180px",
//                             objectFit: "cover",
//                             borderRadius: "10px",
//                           }}
//                         />

//                         <h3>{hotel.name}</h3>
//                         <p>{hotel.address}</p>
//                         <p>⭐ {hotel.rating}</p>

//                         <a href={mapLink} target="_blank" rel="noopener noreferrer">
//                           🔗 View on Google Maps
//                         </a>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* FOOD */}
//               {data.food?.length > 0 && (
//                 <div style={styles.card}>
//                   <h3>🍽️ Food</h3>
//                   {data.food.map((item, i) => {
//                     const link = `https://www.google.com/maps/search/?api=1&query=${item.name} ${destination}`;
//                     const imageUrl = `https://source.unsplash.com/400x250/?restaurant,${item.name}`;

//                     return (
//                       <div key={i} style={styles.card}>
//                         <img
//                           src={imageUrl}
//                           alt={item.name}
//                           style={{
//                             width: "100%",
//                             height: "180px",
//                             objectFit: "cover",
//                             borderRadius: "10px",
//                           }}
//                         />

//                         <h3>{item.name}</h3>
//                         <p>{item.address}</p>
//                         <p>💰 {item.cost}</p>

//                         <a href={link} target="_blank" rel="noopener noreferrer">
//                           🔗 View on Maps
//                         </a>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* TRANSPORT */}
//               {data.transport?.length > 0 && (
//                 <div style={styles.card}>
//                   <h3>🚗 Transport</h3>
//                   {data.transport.map((t, i) => {
//                     const link = `https://www.google.com/search?q=${t.type} in ${destination}`;

//                     return (
//                       <div key={i} style={styles.card}>
//                         <h3>{t.type}</h3>
//                         <p>{t.details}</p>
//                         <p>💰 {t.cost}</p>

//                         <a href={link} target="_blank" rel="noopener noreferrer">
//                           🔗 Search Transport
//                         </a>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* TIPS */}
//               {data.tips?.length > 0 && (
//                 <div style={styles.card}>
//                   <h3>📝 Tips</h3>
//                   {data.tips.map((tip, i) => (
//                     <p key={i}>• {tip}</p>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// const styles = {
//   container: {
//     padding: "30px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     maxWidth: "500px",
//     margin: "auto",
//   },
//   result: {
//     marginTop: "20px",
//   },
//   card: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "10px",
//     marginBottom: "10px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//   },
// };

// export default CreateTrip;