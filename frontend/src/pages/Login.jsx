// import React from "react";

// const Login = () => {
//     return (
//     <div
//         style={{
//         height: "100vh",
//         backgroundImage: "url('/src/assets/bg.jpeg')",
//         backgroundSize: "cover",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         }}
//     >
//         <div
//         style={{
//             background: "rgba(255,255,255,0.2)",
//             backdropFilter: "blur(10px)",
//             padding: "35px",
//             borderRadius: "15px",
//             width: "320px",
//             textAlign: "center",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//         }}
//         >
//         <h2 style={{ marginBottom: "20px" }}>Welcome Back ✈️</h2>
//         <p style={{ fontSize: "14px", marginBottom: "15px", color: "#555" }}>
//             Plan your dream trips effortlessly 🌍
//         </p>

//         <input
//             type="email"
//             placeholder="Email"
//             style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             }}
//         />

//         <input
//             type="password"
//             placeholder="Password"
//             style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "20px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             }}
//         />

//         <button
//             style={{
//             width: "100%",
//             padding: "10px",
//             borderRadius: "8px",
//             border: "none",
//             background: "linear-gradient(to right, #3b82f6, #06b6d4)",
//             color: "white",
//             fontWeight: "bold",
//             cursor: "pointer",
//             }}
//         >
//             Login
//         </button>

//         <p style={{ marginTop: "15px", fontSize: "14px" }}>
//             Don't have an account? <a href="/signup">Signup</a>
//         </p>
//         </div>
//     </div>
//     );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    // ✅ State for inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Handle login
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // ✅ Toast instead of alert
            toast.success("Login successful!");

            // ✅ Navigate to home/dashboard
            navigate("/");

        } catch (err) {
            toast.error("Invalid credentials");
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
                <h2 style={{ marginBottom: "20px" }}>Welcome Back ✈️</h2>
                <p style={{ fontSize: "14px", marginBottom: "15px", color: "#555" }}>
                    Plan your dream trips effortlessly 🌍
                </p>

                {/* ✅ Email input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />

                {/* ✅ Password input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />

                {/* ✅ Button connected */}
                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "none",
                        background: "linear-gradient(to right, #3b82f6, #06b6d4)",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>

                <p style={{ marginTop: "15px", fontSize: "14px" }}>
                    Don't have an account? <a href="/signup">Signup</a>
                </p>
            </div>
        </div>
    );
};

export default Login;