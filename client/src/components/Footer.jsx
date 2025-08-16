import "../styles/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ft">


      {/* Mega columns (accordion on mobile, grid on desktop) */}
      <div className="ft-wrap" role="navigation" aria-label="Footer">
        {/* Column 1 */}
        <details className="ft-col" open>
          <summary className="ft-col-heading">Get to Know Us</summary>
          <ul className="ft-list">
            <li><a href="#">About CSE340 Garage</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
            <li><a href="#">Press & Media</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </details>

        {/* Column 2 */}
        <details className="ft-col" open>
          <summary className="ft-col-heading">Make Money with Us</summary>
          <ul className="ft-list">
            <li><a href="#">Sell your vehicle</a></li>
            <li><a href="#">Dealer partnerships</a></li>
            <li><a href="#">Affiliate program</a></li>
            <li><a href="#">Advertise with us</a></li>
            <li><a href="#">API for partners</a></li>
          </ul>
        </details>

        {/* Column 3 */}
        <details className="ft-col" open>
          <summary className="ft-col-heading">Customer Service</summary>
          <ul className="ft-list">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Order tracking</a></li>
            <li><a href="#">Shipping & pickup</a></li>
            <li><a href="#">Returns & refunds</a></li>
            <li><a href="#">Report a safety issue</a></li>
          </ul>
        </details>

        {/* Column 4 */}
        <details className="ft-col" open>
          <summary className="ft-col-heading">Policies</summary>
          <ul className="ft-list">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Compliance</a></li>
          </ul>
        </details>

        {/* Column 5 */}
        <details className="ft-col" open>
          <summary className="ft-col-heading">Connect</summary>
          <ul className="ft-list">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">X / Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </details>
      </div>

      {/* Region / language / currency strip */}
      <div className="ft-prefs">
        <div className="ft-brand">CSE340 Garage</div>
        <div className="ft-pickers">
          <button className="ft-pill" aria-label="Change language">English</button>
          <button className="ft-pill" aria-label="Change currency">USD $</button>
          <button className="ft-pill" aria-label="Change region">Nigeria</button>
        </div>
      </div>

      {/* Legal row */}
      <div className="ft-legal">
        <nav className="ft-legal-links" aria-label="Legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
          <a href="#">Sitemap</a>
        </nav>
        <small className="ft-copy">© {year} CSE340 Garage. All rights reserved.</small>
      </div>
    </footer>
  );
}
