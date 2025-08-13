// client/src/pages/Inventory.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Inventory.css"; // your separate CSS file
import Loading from "../components/loading";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:5500/inv");
        // Support either { rows: [...] } or just [...]
        const list = Array.isArray(data) ? data : data?.rows || [];
        setItems(list);
      } catch (err) {
        setError(err?.message || "Failed to load classifications.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

    useEffect(() => {
    document.title = "Inventory - My Awesome Site";
  }, []);




  if (loading) return <Loading/>;
  if (error)   return <nav className="inv-nav"><ul><li>Error: {error}</li></ul></nav>;

  return (
    <main className="inv-nav">
      <ul>
        {items.map((row) => (
          <li key={row.classification_id}>
            <a
              href={`/inv/type/${row.classification_id}`}
              title={`See our inventory of ${row.classification_name} vehicles`}
            >
              {row.classification_name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
