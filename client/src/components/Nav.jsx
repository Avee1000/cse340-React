import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";

export default function Nav() {
  const {user} = useAuth();
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

  console.log("Nav user:", user);
  return (
    <header style={styles.header}>
      <div style={styles.brand}><Link to="/" style={styles.brandLink}>CSE340 Garage</Link></div>
      <nav style={styles.nav}>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/inventory" prefetch="intent" style={styles.link}>Inventory</Link>
        {user ? (<div className="" style={styles.link}>
          <div className="btn btn-secondary dropdown-toggle dropdown-toggle-split d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false">{user.email}</div>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" to="/account">Account</Link></li>
            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
        ) : (<Link to="/login" style={styles.link}>Login</Link>)}
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