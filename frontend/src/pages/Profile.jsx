import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState(
    storedUser?.name || ""
  );

  const [avatar, setAvatar] = useState(
    storedUser?.avatar || ""
  );

  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/profile/update-profile",
        {
          email: storedUser.email,
          name,
          avatar,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile updated successfully");

      window.location.href = "/";

    } catch (error) {
      console.log(error);

      alert("Error updating profile");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <img
            src={
              avatar ||
              `https://ui-avatars.com/api/?name=${name}`
            }
            alt="avatar"
            style={styles.avatar}
          />

          <h1 style={styles.title}>
            Edit Profile
          </h1>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Enter Avatar URL"
            value={avatar}
            onChange={(e) =>
              setAvatar(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <button
            onClick={handleUpdate}
            style={styles.button}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(rgba(2,6,23,0.75), rgba(15,23,42,0.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "25px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    color: "white",
  },

  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: "4px solid #3b82f6",
  },

  title: {
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right, #3b82f6, #06b6d4)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Profile;