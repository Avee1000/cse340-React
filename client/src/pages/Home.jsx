// client/src/pages/Home.jsx
import { useEffect, useState } from "react";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/inv/featured"); // make this endpoint later
        if (!res.ok) throw new Error("no featured yet");
        const data = await res.json();
        if (!ignore) setFeatured(Array.isArray(data) ? data : []);
      } catch {
        // fallback placeholders if API not ready
        if (!ignore) {
          setFeatured([
            { inv_id: 1, inv_year: 2020, inv_make: "Ford", inv_model: "Focus", price: 12000 },
            { inv_id: 2, inv_year: 2019, inv_make: "Toyota", inv_model: "Corolla", price: 13500 },
            { inv_id: 3, inv_year: 2021, inv_make: "Honda", inv_model: "Civic", price: 16000 },
          ]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <main style={styles.wrap}>
      {/* Hero */}
      <section style={styles.hero}>
        <div>
          <h1 style={styles.h1}>Find your next ride</h1>
          <p style={styles.p}>Browse inventory, save favorites, and manage your account.</p>
          <a href="/inventory" style={styles.cta}>Browse Inventory</a>
        </div>
        <div style={styles.heroImg} aria-hidden />
      </section>

      {/* Featured */}
      <section>
        <h2 style={styles.h2}>Featured</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={styles.grid}>
            {featured.map((v) => (
              <a key={v.inv_id} href={`/inventory/${v.inv_id}`} style={styles.card}>
                <div style={styles.carThumb} aria-hidden />
                <div style={styles.cardBody}>
                  <div style={styles.carTitle}>
                    {v.inv_year} {v.inv_make} {v.inv_model}
                  </div>
                  {v.price ? <div style={styles.price}>${Number(v.price).toLocaleString()}</div> : null}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "20px 16px" },
  hero: { display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:24, alignItems:"center", padding:"24px 0" },
  h1: { fontSize:"2rem", margin:"0 0 8px" },
  p: { margin:"0 0 16px", color:"#555" },
  cta: { display:"inline-block", padding:"10px 14px", borderRadius:10, border:"1px solid #111", textDecoration:"none", color:"#111" },
  heroImg: { minHeight:160, borderRadius:16, background:"linear-gradient(135deg,#f2f2f2,#e9e9e9)" },
  h2: { fontSize:"1.2rem", margin:"8px 0 12px" },
  grid: { display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))" },
  card: { display:"block", border:"1px solid #eee", borderRadius:14, overflow:"hidden", textDecoration:"none", color:"inherit", background:"#fff" },
  carThumb: { aspectRatio:"16/9", background:"#f5f5f5" },
  cardBody: { padding:12, display:"grid", gap:6 },
  carTitle: { fontWeight:600 },
  price: { color:"#0b7", fontWeight:600 }
};
