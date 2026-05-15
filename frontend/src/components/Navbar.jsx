// import { useContext, useEffect, useRef, useState } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// function Navbar() {
//   const { darkMode, toggleTheme } = useContext(ThemeContext);

//   const [showMenu, setShowMenu] = useState(false);

//   const menuRef = useRef();

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // CLOSE MENU ON OUTSIDE CLICK

//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);

//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <nav
//       style={{
//         ...styles.nav,
//         background: darkMode ? "#0f172a" : "linear-gradient(to right, #1e418e, #2b5b96)",
//         borderBottom: darkMode
//           ? "1px solid #1e293b"
//           : "1px solid rgba(255,255,255,0.1)",
//       }}
//     >
//       {/* LOGO */}

//       <a href="/" style={styles.logo}>
//        AI Trip Planner
//       </a>

//       {/* RIGHT */}

//       <div style={styles.right}>
//         {/* DARK MODE */}

//         <button onClick={toggleTheme} style={styles.themeBtn}>
//           {darkMode ? "☀️" : "🌙"}
//         </button>

//         {/* MY TRIPS */}

//         <a href="/my-trips" style={styles.link}>
//           📅 My Trips
//         </a>

//         {/* PROFILE */}

//         <div style={{ position: "relative" }} ref={menuRef}>
//           <img
//             onClick={() => setShowMenu(!showMenu)}
//             src={`https://ui-avatars.com/api/?name=${
//               user?.name || "User"
//             }&background=2563eb&color=fff`}
//             alt="avatar"
//             style={styles.avatar}
//           />

//           {showMenu && (
//             <div
//               style={{
//                 ...styles.dropdown,
//                 background: darkMode ? "#111827" : "white",
//                 color: darkMode ? "white" : "#111827",
//               }}
//             >
//               <div style={styles.userSection}>
//                 <img
//                   src={`https://ui-avatars.com/api/?name=${
//                     user?.name || "User"
//                   }&background=2563eb&color=fff`}
//                   alt="avatar"
//                   style={styles.largeAvatar}
//                 />

//                 <h3 style={{ margin: 0 }}>
//                   {user?.name || "Guest User"}
//                 </h3>

//                 <p
//                   style={{
//                     margin: "5px 0 0",
//                     fontSize: "13px",
//                     color: darkMode ? "#cbd5e1" : "#64748b",
//                   }}
//                 >
//                   {user?.email || "No Email"}
//                 </p>
//               </div>

//               <div style={styles.menu}>
//                 <a href="/" style={styles.menuItem}>
//                   🏠 Home
//                 </a>

//                 <a href="/create-trip" style={styles.menuItem}>
//                   ✈️ Create Trip
//                 </a>

//                 <a href="/my-trips" style={styles.menuItem}>
//                   📅 My Trips
//                 </a>

//                 <a href="/profile" style={styles.menuItem}>
//                   👤 Edit Profile
//                 </a>

//                 <button onClick={handleLogout} style={styles.logoutBtn}>
//                   🔴 Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// const styles = {
//   nav: {
//     padding: "15px 30px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   },

//   logo: {
//     color: "white",
//     textDecoration: "none",
//     fontSize: "24px",
//     fontWeight: "bold",
//   },

//   right: {
//     display: "flex",
//     alignItems: "center",
//     gap: "18px",
//   },

//   themeBtn: {
//     border: "none",
//     background: "rgba(255,255,255,0.15)",
//     padding: "10px 12px",
//     borderRadius: "10px",
//     cursor: "pointer",
//     color: "white",
//     fontSize: "16px",
//   },

//   link: {
//     color: "white",
//     textDecoration: "none",
//     fontWeight: "500",
//   },

//   avatar: {
//     width: "42px",
//     height: "42px",
//     borderRadius: "50%",
//     cursor: "pointer",
//     border: "2px solid white",
//   },

//   dropdown: {
//     position: "absolute",
//     top: "60px",
//     right: 0,
//     width: "260px",
//     borderRadius: "18px",
//     overflow: "hidden",
//     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
//   },

//   userSection: {
//     padding: "25px 20px",
//     textAlign: "center",
//     borderBottom: "1px solid rgba(148,163,184,0.2)",
//   },

//   largeAvatar: {
//     width: "70px",
//     height: "70px",
//     borderRadius: "50%",
//     marginBottom: "10px",
//   },

//   menu: {
//     display: "flex",
//     flexDirection: "column",
//   },

//   menuItem: {
//     padding: "14px 20px",
//     textDecoration: "none",
//     color: "inherit",
//     fontWeight: "500",
//   },

//   logoutBtn: {
//     margin: "15px",
//     padding: "12px",
//     border: "none",
//     borderRadius: "10px",
//     background: "#dc2626",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
// };

// export default Navbar;

import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // CLOSE MENU ON OUTSIDE CLICK

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}

      <a href="/" style={styles.logo}>
        AI Trip Planner
      </a>

      {/* RIGHT */}

      <div style={styles.right}>
        {/* MY TRIPS */}

        <a href="/my-trips" style={styles.link}>
          📅 My Trips
        </a>

        {/* PROFILE */}

        <div style={{ position: "relative" }} ref={menuRef}>
          <img
            onClick={() => setShowMenu(!showMenu)}
            src={
              user?.avatar
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${
                    user?.name || "User"
                  }&background=2563eb&color=fff`
            }
            alt="avatar"
            style={styles.avatar}
          />

          {showMenu && (
            <div style={styles.dropdown}>
              <div style={styles.userSection}>
                <img
                  src={
                    user?.avatar
                      ? user.avatar
                      : `https://ui-avatars.com/api/?name=${
                          user?.name || "User"
                        }&background=2563eb&color=fff`
                  }
                  alt="avatar"
                  style={styles.largeAvatar}
                />

                <h3 style={{ margin: 0 }}>
                  {user?.name || "Guest User"}
                </h3>

                <p style={styles.email}>
                  {user?.email || "No Email"}
                </p>
              </div>

              <div style={styles.menu}>
                <a href="/" style={styles.menuItem}>
                  🏠 Home
                </a>

                <a href="/create-trip" style={styles.menuItem}>
                  ✈️ Create Trip
                </a>

                <a href="/my-trips" style={styles.menuItem}>
                  📅 My Trips
                </a>

                <a href="/profile" style={styles.menuItem}>
                  👤 Edit Profile
                </a>

                <button
                  onClick={handleLogout}
                  style={styles.logoutBtn}
                >
                  🔴 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
  },

  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
  },

  avatar: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "2px solid white",
    objectFit: "cover",
  },

  dropdown: {
    position: "absolute",
    top: "65px",
    right: 0,
    width: "280px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#111827",
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
  },

  userSection: {
    padding: "28px 20px",
    textAlign: "center",
    borderBottom:
      "1px solid rgba(148,163,184,0.15)",
  },

  largeAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "12px",
    objectFit: "cover",
    border: "3px solid #3b82f6",
  },

  email: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#cbd5e1",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
  },

  menuItem: {
    padding: "15px 22px",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    borderBottom:
      "1px solid rgba(255,255,255,0.05)",
  },

  logoutBtn: {
    margin: "18px",
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default Navbar;