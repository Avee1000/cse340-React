import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Vehicle.css"; 
import Loading from "../components/loading";

export default function Vehicle() {
    const { classificationId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:5500/inv/type/${classificationId}`)
            .then((res) => {
                setItems(res.data)
            })
            .catch(err => {
                setError(err?.message || "Failed to load classifications.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (items?.title) {
            document.title = items.title;
        }
    }, [items]); 


    if (loading) return <Loading />;
    if (error) return <nav className="inv-nav"><ul><li>Error: {error}</li></ul></nav>;

 if (!items || items.length === 0) {
    return (
      <p className="notice">
        Sorry, no matching vehicles could be found or there are no vehicles to be displayed.
      </p>
    );
  }

  return (
    <main id="vehicleMainContainer">
        <h1>{items.title}</h1>
        <ul id="inv-display" className="inventory-container-grid">
        {items.vehicles.map((vehicle) => (
            <li key={vehicle.inv_id} className="car-card">
            <a
                href={`/inv/detail/${vehicle.inv_id}`}
                title={`View ${vehicle.inv_make} ${vehicle.inv_model} details`}
            >
                <img
                className="car-thumb"
                src={vehicle.inv_thumbnail}
                alt={`Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors`}
                />
            </a>

            <div className="car-card-body">
                <div className="name-wishlist">
                <h2 className="car-title">
                    <a
                    href={`/inv/detail/${vehicle.inv_id}`}
                    title={`View ${vehicle.inv_make} ${vehicle.inv_model} details`}
                    >
                    {vehicle.inv_make} {vehicle.inv_model}
                    </a>
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
        </ul>
    </main>

  );
}