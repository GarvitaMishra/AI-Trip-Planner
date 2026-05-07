// import { useContext, useState } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// function Navbar() {
//   const { toggleTheme } = useContext(ThemeContext);
//   const [showMenu, setShowMenu] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div style={styles.nav}>
//       <h2>✈️ AI Trip Planner</h2>

//       <div style={styles.right}>
//         <button onClick={toggleTheme}>🌙</button>

//         <div style={{ position: "relative" }}>
//           <img
//             onClick={() => setShowMenu(!showMenu)}
//             src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`}
//             alt="avatar"
//             style={{ ...styles.avatar, cursor: "pointer" }}
//           />

//           {showMenu && (
//             <div style={styles.dropdown}>
              
//               {/* Top User Info */}
//               <div style={styles.userInfo}>
//                 <div>
//                   <p style={styles.name}>{user?.name}</p>
//                   <p style={styles.email}>{user?.email}</p>
//                 </div>
//               </div>

//               <hr />

//               {/* Menu Options */}
//               <p style={styles.menuItem}>👤 Profile</p>
//               <p style={styles.menuItem}>📅 Trips</p>
//               <p style={styles.menuItem}>⚙️ Settings</p>

//               <hr />

//               <p onClick={handleLogout} style={styles.logout}>
//                 🔴 Logout
//               </p>

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "15px 30px",
//     background: "#4f46e5",
//     color: "white"
//   },
//   right: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px"
//   },
//   avatar: {
//     borderRadius: "50%"
//   },
//   dropdown: {
//     position: "absolute",
//     top: "50px",
//     right: "0",
//     background: "#ffffff",
//     padding: "10px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 10px rgba(242, 238, 238, 0.2)",
//     width: "150px",
//     textAlign: "left",
//   },
// };

// export default Navbar;

import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={styles.nav}>
      <h2>✈️ AI Trip Planner</h2>

      <div style={styles.right}>
        <button onClick={toggleTheme}>🌙</button>

        <a href="/my-trips" style={{ color: "white", textDecoration: "none", marginLeft: "15px" }}>
          📅 My Trips
        </a>

        <div style={{ position: "relative" }}>
          <img
            onClick={() => setShowMenu(!showMenu)}
            src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0D8ABC&color=fff`}
            alt="avatar"
            style={{ ...styles.avatar, cursor: "pointer" }}
          />

          {showMenu && (
            <div style={styles.dropdown}>
              
              {/* User Info */}
              <div style={styles.userInfo}>
                <p style={styles.name}>{user?.name || "Guest User"}</p>
                <p style={styles.email}>{user?.email || "No email"}</p>
              </div>

              <hr style={styles.divider} />

              {/* Menu */}
              <p style={styles.menuItem}>👤 Profile</p>
              <p style={styles.menuItem}>📅 Trips</p>
              <p style={styles.menuItem}>⚙️ Settings</p>

              <hr style={styles.divider} />

              <p onClick={handleLogout} style={styles.logout}>
                🔴 Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#4f46e5",
    color: "white",
    alignItems: "center"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  avatar: {
    borderRadius: "50%",
    width: "40px",
    height: "40px"
  },

  dropdown: {
    position: "absolute",
    top: "50px",
    right: "0",
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    width: "220px",
    textAlign: "left",
    zIndex: 100
  },

  userInfo: {
    marginBottom: "10px"
  },

  name: {
    margin: 0,
    fontWeight: "bold",
    color: "#111"
  },

  email: {
    margin: 0,
    fontSize: "12px",
    color: "#666"
  },

  menuItem: {
    margin: "8px 0",
    cursor: "pointer",
    color: "#333"
  },

  logout: {
    marginTop: "10px",
    cursor: "pointer",
    color: "red",
    fontWeight: "500"
  },

  divider: {
    margin: "10px 0",
    border: "none",
    borderTop: "1px solid #eee"
  }
};

export default Navbar;