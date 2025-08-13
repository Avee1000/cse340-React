// client/src/pages/Inventory.jsx
import { useEffect, useMemo, useState } from "react";
import "../styles/Inventory.css"; // <- separate css file

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/inv"); // your API should return an array of vehicles
        if (!res.ok) throw new Error("No inventory yet");
        const data = await res.json();
        if (!ignore) setItems(Array.isArray(data) ? data : []);
      } catch {
        // fallback demo data so the page still looks good
        if (!ignore) {
          setItems([
            { inv_id: 1, inv_year: 2021, inv_make: "Honda",  inv_model: "Civic",  inv_price: 16000, inv_miles: 23000, inv_color:"Blue" },
            { inv_id: 2, inv_year: 2020, inv_make: "Toyota", inv_model: "Corolla",inv_price: 14500, inv_miles: 31000, inv_color:"Silver" },
            { inv_id: 3, inv_year: 2019, inv_make: "Ford",   inv_model: "Focus",  inv_price: 12000, inv_miles: 40000, inv_color:"Black" },
            { inv_id: 4, inv_year: 2022, inv_make: "Kia",    inv_model: "Rio",    inv_price: 17000, inv_miles: 12000, inv_color:"Red" },
          ]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    let list = !text
      ? items
      : items.filter(v =>
          [v.inv_make, v.inv_model, v.inv_year, v.inv_color]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(text)
        );

    if (sort === "price-asc")  list = [...list].sort((a,b)=>(a.inv_price||0)-(b.inv_price||0));
    if (sort === "price-desc") list = [...list].sort((a,b)=>(b.inv_price||0)-(a.inv_price||0));
    if (sort === "newest")     list = [...list].sort((a,b)=>(b.inv_year||0)-(a.inv_year||0));

    return list;
  }, [items, q, sort]);

  return (
    <main className="inv-wrap">
      <header className="inv-toolbar">
        <h1 className="inv-title">Inventory</h1>
        <div className="inv-controls">
          <input
            className="inv-search"
            placeholder="Search make, model, color..."
            value={q}
            onChange={e=>setQ(e.target.value)}
          />
          <select
            className="inv-sort"
            value={sort}
            onChange={e=>setSort(e.target.value)}
            aria-label="Sort"
          >
            <option value="newest">Newest year</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </header>

      {loading ? (
        <div className="inv-grid">
          {Array.from({length:6}).map((_,i)=>(
            <div className="inv-card skeleton" key={i}>
              <div className="inv-thumb" />
              <div className="inv-body">
                <div className="s1" /><div className="s2" /><div className="s3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="inv-empty">No vehicles match “{q}”.</p>
      ) : (
        <div className="inv-grid">
          {filtered.map(v => (
            <a className="inv-card" key={v.inv_id} href={`/inventory/${v.inv_id}`}>
              <div className="inv-thumb" aria-hidden />
              <div className="inv-body">
                <div className="inv-name">
                  {v.inv_year} {v.inv_make} {v.inv_model}
                </div>
                <div className="inv-meta">
                  {v.inv_color ? <span>{v.inv_color}</span> : null}
                  {typeof v.inv_miles === "number" ? <span>{v.inv_miles.toLocaleString()} mi</span> : null}
                </div>
                {typeof v.inv_price === "number" ? (
                  <div className="inv-price">${v.inv_price.toLocaleString()}</div>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
