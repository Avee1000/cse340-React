// client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import "../styles/Index.css"; // <-- make sure this path exists

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
        if (!ignore) {
          setFeatured([
            { inv_id: 1, inv_year: 2020, inv_make: "Ford",   inv_model: "Focus",   price: 12000 },
            { inv_id: 2, inv_year: 2019, inv_make: "Toyota", inv_model: "Corolla", price: 13500 },
            { inv_id: 3, inv_year: 2021, inv_make: "Honda",  inv_model: "Civic",   price: 16000 },
          ]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <main className="home-wrap">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1 className="home-title">Find your next ride</h1>
          <p className="home-subtitle">Browse inventory, save favorites, and manage your account.</p>
          <a href="/inventory" className="home-cta">Browse Inventory</a>
        </div>
        <div className="home-hero-img" aria-hidden />
      </section>

      {/* Featured */}
      <section>
        <h2 className="home-h2">Featured</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="home-grid">
            {featured.map((v) => (
              <a key={v.inv_id} href={`/inventory/${v.inv_id}`} className="car-card">
                <div className="car-thumb" aria-hidden />
                <div className="car-card-body">
                  <div className="car-title">
                    {v.inv_year} {v.inv_make} {v.inv_model}
                  </div>
                  {v.price ? <div className="car-price">${Number(v.price).toLocaleString()}</div> : null}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
