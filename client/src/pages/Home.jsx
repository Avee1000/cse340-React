import { useEffect, useMemo, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from "../contexts/AuthContext.jsx";
import Starfield from "../components/Starfield.jsx";
import "../styles/Index.css";


let heroData = [
  {
    id: 1,
    image: "/images/site/hero1.jpg",
  },
  {
    id: 2,
    image: "/images/site/hero2.jpg",
  },
  {
    id: 3,
    image: "/images/site/hero3.jpg",
  }
]

export default function Home() {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
      } catch (e) {
        if (!ignore) setErr(e?.message || "Failed to load home data");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  // Small helper to format money
  const money = useMemo(
    () => (n) => (typeof n === "number" ? `$${n.toLocaleString()}` : ""),
    []
  );

  return (
    <div id="homeContainer">
      <div id="homeHeroContainer" className="position-relative" >
        <div id="homeHeroCarouselContainer" className="w-100">
          <Carousel className="w-100" controls={false} indicators={false} interval={6000} pause={false} >
            {heroData.map((hero) => {
              return (
                <Carousel.Item key={hero.id}>
                  <img className="carouselImage" src={hero.image} alt={"Slide" + hero.id} />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>

        <div id="homeHeroTextContainer" className="position-absolute top-50 start-0 w-100">
          <section className="home-hero px-5 py-3 d-flex align-items-center justify-content-center">
            <div className="home-hero-copy">
              <h1 className="home-title text-center">Find your next ride</h1>
              <p className="home-subtitle text-center">
                Browse inventory, save favorites, and manage your account.
              </p>
              <div className="home-cta-row d-flex gap-3 justify-content-center mt-4">
                <a href="/inventory" className="home-cta">Browse Inventory</a>
                {!user && <a href="/register" className="home-cta alt">Sign up</a>}
              </div>
            </div>
          </section>
        </div>
      </div>


      {/* <main className="home-wrap">

        <section className="home-section">
          <div className="home-section-head">
            <h2 className="home-h2">Shop by category</h2>
          </div>

          {loading ? (
            <p>Loading categories…</p>
          ) : classifications.length === 0 ? (
            <p className="muted">No categories yet.</p>
          ) : (
            <nav className="pill-nav" aria-label="Vehicle categories">
              {classifications.map((c) => (
                <a
                  key={c.classification_id}
                  className="pill"
                  href={`/inventory/classification/${c.classification_id}`}
                >
                  {c.classification_name}
                </a>
              ))}
            </nav>
          )}
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2 className="home-h2">Featured</h2>
            <a className="link" href="/inventory">See all</a>
          </div>

          {loading ? (
            <p>Loading featured…</p>
          ) : err ? (
            <p className="error">{err}</p>
          ) : featured.length === 0 ? (
            <p className="muted">No featured vehicles yet.</p>
          ) : (
            <div className="home-grid">
              {featured.map((v) => (
                <a key={v.inv_id} href={`/inventory/${v.inv_id}`} className="car-card [border-radius:14px_0_14px_0]">
                  {v.inv_thumbnail ? (
                    <img
                      className="car-thumb"
                      src={v.inv_thumbnail}
                      alt={`Image of ${v.inv_make} ${v.inv_model}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="car-thumb" aria-hidden />
                  )}

                  <div className="car-card-body">
                    <div className="car-title truncate-1">
                      {v.inv_year} {v.inv_make} {v.inv_model}
                    </div>
                    {v.inv_price != null && (
                      <div className="car-price">{money(Number(v.inv_price))}</div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2 className="home-h2">Latest arrivals</h2>
            <a className="link" href="/inventory?sort=newest">New in</a>
          </div>

          {loading ? (
            <p>Loading latest…</p>
          ) : latest.length === 0 ? (
            <p className="muted">No recent arrivals.</p>
          ) : (
            <div className="home-grid">
              {latest.map((v) => (
                <a key={v.inv_id} href={`/inventory/${v.inv_id}`} className="car-card">
                  {v.inv_thumbnail ? (
                    <img
                      className="car-thumb"
                      src={v.inv_thumbnail}
                      alt={`Image of ${v.inv_make} ${v.inv_model}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="car-thumb" aria-hidden />
                  )}
                  <div className="car-card-body">
                    <div className="car-title truncate-1">
                      {v.inv_year} {v.inv_make} {v.inv_model}
                    </div>
                    {v.inv_price != null && (
                      <div className="car-price">{money(Number(v.inv_price))}</div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section> */}

        {/* Value props / trust (static copy; data is still from DB for vehicles) */}
        {/* <section
        className="container carousel slide my-2 mb-4"
        data-bs-ride="carousel"
        data-bs-interval="2000"
        id="homeCarousel"
      >
        <div className="carousel-inner border border-1 rounded-3">
          <div className="carousel-item active">
            <div className="stat-card text-center py-4">
              <div className="stat-k display-6">✅</div>
              <div className="stat-t">Verified listings</div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="stat-card text-center py-4">
              <div className="stat-k display-6">💳</div>
              <div className="stat-t">Flexible payment</div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="stat-card text-center py-4">
              <div className="stat-k display-6">🛠️</div>
              <div className="stat-t">Inspected vehicles</div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="stat-card text-center py-4">
              <div className="stat-k display-6">🛡️</div>
              <div className="stat-t">Secure account</div>
            </div>
          </div>
        </div>

      </section> */}

        {/* Final CTA */}
        <section className="home-section">
          <div className="cta-banner">
            <div>
              <h3 className="home-h2">Ready to explore more?</h3>
              <p className="home-subtitle">Filter by category, save your wishlist, and compare easily.</p>
            </div>
            <a href="/inventory" className="home-cta">Browse Inventory</a>
          </div>
        </section>
      {/* </main> */}
    </div>
  );
}
