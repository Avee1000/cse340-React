export default function Footer() {
  return (
    <footer style={styles.footer}>
      <small>© {new Date().getFullYear()} CSE340 Garage</small>
    </footer>
  );
}
const styles = {
  footer: { marginTop:40, padding:"20px 16px", borderTop:"1px solid #eee", textAlign:"center", color:"#666" }
};