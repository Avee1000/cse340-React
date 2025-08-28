import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import api from "../api"
import { ButtonLoading } from "./loading";
import { use } from "react";

export default function Nav() {
  const {user} = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
    async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  useEffect(() => {
    if (!user) {
      setLoading(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setLoading(true);

          const  token =  await user.getIdToken();
          // Send POST request with Firebase UID
          const response = await api.post(`/api/auth/login`, {
            uid: user.uid,
            token: token,
          });
          const firstname = response.data.account_firstname[0].toUpperCase() + response.data.account_lastname[0].toUpperCase();
          setUserData(firstname);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data");
          setUserData("??")
        } finally {
          setLoading(false);
          setError(null)
        }
      }
    };
    fetchUserData();
  }, [user]);


  return (
    <header style={styles.header}>
      <div style={styles.brand}><Link to="/" style={styles.brandLink}>CSE340 Garage for Jessica</Link></div>
      <nav style={styles.nav}>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/inventory" prefetch="intent" style={styles.link}>Inventory</Link>
          {/* if the user is logged in */}
        {user ? (<div className="" style={styles.link}>
          <div   className="border border-black dropdown-toggle-split d-flex align-items-center justify-content-center gap-2 fs-6 rounded-circle"  style={{ width: "35px", height: "35px" }} data-bs-toggle="dropdown" aria-expanded="false">{userData}</div>
          <ul className="dropdown-menu dropdown-menu-end">
                {error && (
                  <li className="dropdown-item text-danger small">
                    {error}
                  </li>
                )}
            <li><Link className="dropdown-item" to="/account">Account</Link></li>
            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
        ) : (location.pathname !== "/login" && (
              <Link to="/login" style={styles.link}>Login</Link>)
            )}
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: { display:"flex", alignItems:"center", fontFamily: "Roboto", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid #eee", position:"sticky", top:0, background:"#fff", zIndex:10 },
  brand: { fontWeight:700, fontSize:"1.1rem" },
  brandLink: { textDecoration:"none", color:"#111" },
  nav: { display:"flex", gap:"14px" },
  link: { textDecoration:"none", color:"#333", cursor: "pointer" }
};