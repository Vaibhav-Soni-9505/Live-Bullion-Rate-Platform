import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from "lucide-react";

import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import LiveRatesPage from "./pages/LiveRatesPage";
import ContactPage from "./pages/ContactPage";
import naveenLogo from "./assets/naveen-jewellers-logo.png";

/* ── Royal Navbar ──────────────────────────────────── */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/rates", label: "Live Bullion Rates" },
    { to: "/contact", label: "Showroom & Contact" },
  ];

  return (
    <header className="royal-navbar">
      {/* Top Gold Filigree Accent Line */}
      <div className="navbar-gold-trim" />

      <div className="section-container navbar-inner">
        {/* Brand Plinth */}
        <Link to="/" className="royal-brand" onClick={closeMenu}>
          <img
            src={naveenLogo}
            alt="Naveen Jewellers - Since 2000"
            className="navbar-brand-logo"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `royal-nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="navbar-actions-wrap">
          <Link to="/contact" className="navbar-cta-btn">
            <span>Showroom Visit</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Luxury Drawer */}
      <div className={`mobile-drawer-overlay ${menuOpen ? "drawer-visible" : ""}`}>
        <div className="mobile-drawer-pane">
          <div className="drawer-header">
            <img
              src="/images/naveen-jewellers-logo.png"
              alt="Naveen Jewellers"
              className="drawer-logo"
            />
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="drawer-links-group">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `drawer-nav-item ${isActive ? "drawer-item-active" : ""}`
                }
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} className="drawer-link-arrow" />
              </NavLink>
            ))}
          </div>

          <div className="drawer-footer-actions">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="royal-btn-gold w-full-btn text-center"
            >
              Inquire at Showroom
            </Link>

            <a
              href="https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20and%20live%20gold%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-wa-btn"
              onClick={closeMenu}
            >
              <MessageCircle size={18} />
              <span>WhatsApp VIP Desk (+91 90791 05840)</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Royal Footer ──────────────────────────────────── */

function Footer() {
  return (
    <footer className="royal-footer" id="footer">
      <div className="footer-top-accent" />

      <div className="section-container footer-body-grid">
        <div className="footer-brand-col">
          <img
            src={naveenLogo}
            alt="Naveen Jewellers"
            className="footer-logo"
          />
          <p className="footer-tagline">
            Royal Indian craftsmanship, timeless bullion integrity, and certified
            BIS Hallmark purity since 2000.
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rates">Live Bullion Rates</Link></li>
            <li><Link to="/contact">Showroom &amp; Appointments</Link></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4 className="footer-heading">Showroom &amp; Hours</h4>
          <p className="footer-address">
            Opp. Krishna Mandir Road, Subhash Chowk,
            <br />
            Ratanada, Jodhpur, Rajasthan — 342011
            <br />
            Mon – Sun: 10:30 AM – 8:30 PM
          </p>
          <div className="footer-direct-links">
            <a href="tel:+919079105840" className="footer-phone-link">
              <Phone size={14} /> +91 90791 05840
            </a>
            <a
              href="https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20and%20live%20gold%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="footer-wa-link"
            >
              <MessageCircle size={14} /> WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      <div className="section-container footer-copyright-bar">
        <span>© {new Date().getFullYear()} Naveen Jewellers. All Rights Reserved.</span>
        <span className="copyright-heritage">Patronage of Pure Gold · Since 2000</span>
      </div>
    </footer>
  );
}

/* ── App Root ──────────────────────────────────────── */

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rates" element={<LiveRatesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <main className="royal-subpage text-center py-24">
              <div className="section-container">
                <h1 className="subpage-title mb-4">Page Not Found</h1>
                <p className="subpage-desc mb-8">
                  The page you are looking for does not exist or has been relocated.
                </p>
                <Link to="/" className="royal-btn-gold">
                  Return to Home
                </Link>
              </div>
            </main>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
