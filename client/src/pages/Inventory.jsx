// client/src/pages/Inventory.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sort from "../util/function"
import Loading from "../components/loading";
// You can keep your file for tiny overrides if needed
import "../styles/Inventory.css";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [classification, setClassifications] = useState([]);
  const [sortedBy, setSortedBy] = useState("Year");
  const [filterClassification, setFilterClassification] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {

        const [itemsRes, classesRes] = await Promise.all([
          axios.get("http://localhost:5500/inv/allinventory"),
          axios.get("http://localhost:5500/inv"),
        ]);

        const itemsData = Array.isArray(itemsRes.data)
          ? itemsRes.data
          : itemsRes.data?.rows ?? [];

        const classesData = Array.isArray(classesRes.data)
          ? classesRes.data
          : classesRes.data?.rows ?? [];

        setItems(itemsData);
        setClassifications(classesData);

        console.log(itemsRes.data)

      } catch (err) {
        setError(err?.message || "Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    document.title = "View All Inventory";
  }, []);

  // Distinct list of makes for the filter (teaches useMemo)
  const classificationList = useMemo(() => {
    const s = new Set(classification.map(v => v.classification_name).filter(Boolean));
    return ["all", ...Array.from(s)];
  }, [classification]);

  // Simple filter + sort demo
  const visible = useMemo(() => {
    let list = [...items];

    if (filterClassification !== "all") {
      list = list.filter((v) => v.classification_name === filterClassification);
    }

    sort(list, sortedBy);

    return list;
  }, [items, classification, filterClassification, sortedBy]);

  if (loading) {
    // Bootstrap spinner pattern
    return < Loading text="Loading Inventory..." />
  }

  if (error) {
    // Bootstrap alert pattern
    return (
      <main className="container py-4">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </main>
    );
  }

  return (
    <main id="vehicleMainContainer" className="container py-4">
      {/* Page header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <h1 className="h3 mb-2 mb-md-0">Inventory</h1>
        <div className="text-secondary small">
          {visible.length} result{visible.length !== 1 ? "s" : ""}
        </div>
      </div>

      <hr className="d-block w-100 mx-auto my-5 border-1" />

      {/* Controls row (Bootstrap forms) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <label htmlFor="vehicleSortContainer" className="form-label mb-1">Sort by</label>
          <select
            id="vehicleSortContainer"
            className="form-select formSelect"
            value={sortedBy}
            onChange={(e) => setSortedBy(e.target.value)}
          >
            <option value="Year">Year</option>
            <option value="Lowest Price">Price: Low to High</option>
            <option value="Highest Price">Price: High to Low</option>
            <option value="Name">Name (A–Z)</option>
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="vehicleListContainer" className="form-label mb-1">Filter by Classification</label>
          <select
            id="vehicleListContainer"
            className="form-select"
            value={filterClassification}
            onChange={(e) => { setFilterClassification(e.target.value); console.log(e.target.value); }}
          >
            {classificationList.map(m => (
              <option key={m} value={m}>{m === "all" ? "All Classifications" : m}</option>
            ))}

          </select>
        </div>

        <div className="col-12 col-md-4 d-flex align-items-end">
          {/* Example secondary action using Bootstrap buttons */}
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => { setFilterClassification("all"); setSortedBy("Year"); }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Cards grid (responsive) */}
      {visible.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No vehicles match your filters.
        </div>
      ) : (
        <div id="inv-display" className="inventory-container-grid py-5">
          {visible.map((vehicle) => (
            <li key={vehicle.inv_id} className="car-card">
              <Link
                to={`/inv/detail/${vehicle.inv_id}`}
                title={`View ${vehicle.inv_make} ${vehicle.inv_model} details`}
              >
                <img
                  className="car-thumb"
                  src={vehicle.inv_thumbnail}
                  alt={`Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors`}
                />
              </Link>

              <div className="car-card-body">
                <div className="name-wishlist">
                  <h2 className="car-title">
                    <Link
                      to={`/inv/detail/${vehicle.inv_id}`}
                      title={`View ${vehicle.inv_make} ${vehicle.inv_model} details`}
                    >
                      {vehicle.inv_make} {vehicle.inv_model}
                    </Link>
                  </h2>

                  <form method="POST" action="/wishlist/add">
                    <input type="hidden" name="inv_id" value={vehicle.inv_id} />
                    <button type="submit" className="wishlist-btn">Add to Wishlist</button>
                  </form>
                </div>

                <span className="car-price">
                  ${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}
                </span>
              </div>
            </li>
          ))}
        </div>
      )}
    </main>
  );
}
