// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {

//   // ✅ 1. STATE (HERE)
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // ✅ 2. FUNCTION (HERE)
//   const handleSignup = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/signup", {
//         name,
//         email,
//         password,
//       });

//       toast.success("Signup successful!");
//       console.log(res.data);
//     } catch (err) {
//       toast.error("Error signing up");
//       console.log(err);
//     }
//   };


//   return (
//     <div
//       style={{
//         height: "100vh",
//         backgroundImage: "url('/src/assets/bg.jpeg')",
//         backgroundSize: "cover",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           background: "rgba(255,255,255,0.2)",
//           backdropFilter: "blur(10px)",
//           padding: "35px",
//           borderRadius: "15px",
//           width: "320px",
//           textAlign: "center",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//         }}
//       >
//         <h2 style={{ marginBottom: "20px" }}>Create Account 🌍</h2>
//         <p style={{ fontSize: "14px", marginBottom: "15px", color: "#555" }}>
//             Start your journey with us ✈️
//         </p>

//         <input
//           type="text"
//           placeholder="Name"
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "20px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         <button
//           style={{
//             width: "100%",
//             padding: "10px",
//             borderRadius: "8px",
//             border: "none",
//             background: "linear-gradient(to right, #3b82f6, #06b6d4)",
//             color: "white",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//         >
//           Signup
//         </button>

//         <p style={{ marginTop: "15px", fontSize: "14px" }}>
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  // STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FUNCTION
  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Signup successful!");
      console.log(res.data);

      // ✅ Navigate to home
      navigate("/login");
    } catch (err) {
      toast.error("Error signing up");
      console.log(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/src/assets/bg.jpeg')",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          padding: "35px",
          borderRadius: "15px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Create Account 🌍</h2>

        <p style={{ fontSize: "14px", marginBottom: "15px", color: "#555" }}>
          Start your journey with us ✈️
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSignup} style={buttonStyle}>
          Signup
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Signup;