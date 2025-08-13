import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header style={styles.header}>
      <div style={styles.brand}><Link to="/" style={styles.brandLink}>CSE340 Garage</Link></div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/inventory" style={styles.link}>Inventory</Link>
        <Link to="/account" style={styles.link}>My Account</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: { display:"flex", alignItems:"center", fontFamily: "Roboto", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid #eee", position:"sticky", top:0, background:"#fff", zIndex:10 },
  brand: { fontWeight:700, fontSize:"1.1rem" },
  brandLink: { textDecoration:"none", color:"#111" },
  nav: { display:"flex", gap:"14px" },
  link: { textDecoration:"none", color:"#333" }
};