import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Plan Your Dream Trip 🌍</h1>
        <p>AI-powered travel planner with smart recommendations</p>

        <button onClick={() => navigate("/create-trip")}>
          Start Planning
        </button>
      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px"
  }
};

export default Home;