import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Vehicle-detail.css";
import Loading from "../components/loading";

export default function VehicleDetail() {
    const { invId } = useParams();
    const [items, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        let ignore = false; // prevent state set after unmount
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5500/inv/detail/${invId}`);
                if (!ignore) setVehicle(res.data);
                console.log(res.data);
            } catch (e) {
                setError(e)
                console.error("Failed to load vehicle:", e);
            } finally {
                if (!ignore) setLoading(false);
            }
        })();
        return () => { ignore = true; };
    }, [invId]);

    useEffect(() => {
        if (items?.title) {
            document.title = items.title;
        }
    }, [items]);

    if (loading) return <Loading />;
    if (error) return <nav className="inv-nav"><ul><li>Error: {error}</li></ul></nav>;

    return (
        <main id="vehicleDetailsMain">
            <div className="vehicle-background">
                <div id="vehicle-detail-container">
                    <div className="vehicle-detail">
                        {/* Gallery */}
                        <div className="vehicle-image-cont">
                            <img
                                src={`${items.vehicle.inv_image}`}
                                alt={`Image of ${items.vehicle.inv_make} ${items.vehicle.inv_model}`}
                            />
                        </div>

                        {/* Info card */}
                        <div className="vehicle-info">
                            <h2>{items.vehicle.inv_make} {items.vehicle.inv_model}</h2>

                            {/* (Optional) Ratings row */}
                            <div className="vehicle-rating">
                                {/* ★★★★☆ 4.5 (128) – add icons later if you want */}
                                <span>★★★★★</span><span>4.6 (128)</span>
                            </div>

                            {/* Price */}
                            <div className="vehicle-price">
                                <span className="value">
                                    ${new Intl.NumberFormat('en-US').format(items.vehicle.inv_price)}
                                </span>
                                <span className="chip">No-haggle price</span>
                                <span className="chip">Verified listing</span>
                            </div>

                            {/* Meta tags */}
                            <div className="vehicle-meta">
                                <span className="tag">{items.vehicle.inv_year}</span>
                                <span className="tag">{items.vehicle.inv_color}</span>
                                <span className="tag">
                                    {new Intl.NumberFormat('en-US').format(items.vehicle.inv_miles)} miles
                                </span>
                            </div>

                            <hr className="v-hr" />

                            {/* Description */}
                            <p>
                                <span className="vehicle-desc">Description</span>
                                {items.vehicle.inv_description}
                            </p>

                            {/* (Optional) Specs block – add any extra fields here */}
                            <div className="vehicle-specs" style={{ marginTop: 10 }}>
                                <div className="row">
                                    <div className="label">Make</div>
                                    <div className="value">{items.vehicle.inv_make}</div>
                                </div>
                                <div className="row">
                                    <div className="label">Model</div>
                                    <div className="value">{items.vehicle.inv_model}</div>
                                </div>
                                <div className="row">
                                    <div className="label">VIN</div>
                                    <div className="value">{items.vehicle.inv_vin ?? "—"}</div>
                                </div>
                                <div className="row">
                                    <div className="label">Transmission</div>
                                    <div className="value">{items.vehicle.transmission ?? "—"}</div>
                                </div>
                            </div>

                            {/* Buy box actions */}
                            <div className="vehicle-cta">
                                <button className="vehicle-btn">Add to Wishlist</button>
                                <button className="vehicle-btn secondary">Contact Dealer</button>
                            </div>

                            <p className="v-help">Secure checkout. Free cancellation within 24 hours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}



