import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import "../styles/Vehicle.css"; 
import {Loading} from "../components/Loading";

export default function Vehicle() {
    const { classificationId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:5500/inv/type/${classificationId}`)
            .then((res) => {
                setItems(res.data)
                console.log(res.data)
            })
            .catch(err => {
                setError(err?.message || "Failed to load classifications.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [classificationId]);

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
    <main id="">

    </main>

  );
}