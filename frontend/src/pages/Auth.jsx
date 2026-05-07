// import React, { useState } from "react";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);

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
//           background: "rgba(255,255,255,0.95)",
//           padding: "35px",
//           borderRadius: "15px",
//           width: "340px",
//           textAlign: "center",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//         }}
//       >
//         <h2 style={{ marginBottom: "20px" }}>
//           {isLogin ? "Login" : "Signup"}
//         </h2>

//         {/* Toggle Buttons */}
//         <div
//           style={{
//             display: "flex",
//             marginBottom: "20px",
//             borderRadius: "10px",
//             overflow: "hidden",
//             border: "1px solid #ccc",
//           }}
//         >
//           <button
//             onClick={() => setIsLogin(true)}
//             style={{
//               flex: 1,
//               padding: "10px",
//               background: isLogin ? "#2563eb" : "white",
//               color: isLogin ? "white" : "black",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Login
//           </button>

//           <button
//             onClick={() => setIsLogin(false)}
//             style={{
//               flex: 1,
//               padding: "10px",
//               background: !isLogin ? "#2563eb" : "white",
//               color: !isLogin ? "white" : "black",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Signup
//           </button>
//         </div>

//         {/* FORM */}
//         {!isLogin && (
//           <input
//             type="text"
//             placeholder="Name"
//             style={inputStyle}
//           />
//         )}

//         <input type="email" placeholder="Email" style={inputStyle} />
//         <input type="password" placeholder="Password" style={inputStyle} />

//         <button style={buttonStyle}>
//           {isLogin ? "Login" : "Signup"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "15px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
// };

// const buttonStyle = {
//   width: "100%",
//   padding: "10px",
//   borderRadius: "8px",
//   border: "none",
//   background: "#2563eb",
//   color: "white",
//   fontWeight: "bold",
//   cursor: "pointer",
// };

// export default Auth;