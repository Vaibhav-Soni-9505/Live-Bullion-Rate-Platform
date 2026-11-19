import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import BullionBoard from "../components/BullionBoard";
import PriceEstimator from "../components/PriceEstimator";

export default function LiveRatesPage() {
  return (
    <main className="royal-subpage">
      {/* Subpage Royal Hero */}
      <section className="subpage-hero">
        <div className="section-container text-center">
          <div className="royal-header-badge">
            <span className="live-pulse-dot" />
            <span className="badge-text">OFFICIAL MARKET QUOTES</span>
          </div>
          <h1 className="subpage-title">Live Bullion Exchange Rates</h1>
          <div className="royal-divider">
            <span className="divider-line" />
            <span className="divider-gem">♦</span>
            <span className="divider-line" />
          </div>
          <p className="subpage-desc">
            Directly mapped from HB Spot streaming quotes with Indian GST.
            Enjoy 100% transparent pricing and guaranteed hallmarked purity.
          </p>
        </div>
      </section>

      {/* Main Bullion Board */}
      <BullionBoard showHeader={false} id="board" />

      {/* Interactive Weight Estimator */}
      <PriceEstimator id="calculator" />

      {/* Bullion Understanding & Trust Grid */}
      <section className="royal-guide-section">
        <div className="section-container">
          <header className="royal-section-header">
            <div className="royal-header-badge">
              <Sparkles size={13} className="text-gold" />
              <span className="badge-text">PURITY GUIDE &amp; STANDARDS</span>
            </div>
            <h2 className="royal-title">Understanding Bullion Standards</h2>
            <div className="royal-divider">
              <span className="divider-line" />
              <span className="divider-gem">♦</span>
              <span className="divider-line" />
            </div>
          </header>

          <div className="guide-card-grid">
            <div className="royal-guide-card">
              <div className="guide-card-header">
                <span className="purity-badge-pill">24K • 99.90%</span>
                <h3>GOLD 99.90 (24 Karat Pure Gold)</h3>
              </div>
              <p>
                The apex benchmark of pure bullion gold, refined to 999 purity.
                Primarily utilized for physical investment bars, certified gold coins,
                and sovereign wealth preservation.
              </p>
              <ul className="guide-features">
                <li><CheckCircle2 size={14} className="text-gold" /> Ideal for savings &amp; investment bars</li>
                <li><CheckCircle2 size={14} className="text-gold" /> 99.90% Certified Pure Elemental Gold</li>
                <li><CheckCircle2 size={14} className="text-gold" /> Governed by national BIS Hallmarking standards</li>
              </ul>
            </div>

            <div className="royal-guide-card">
              <div className="guide-card-header">
                <span className="purity-badge-pill">22K+ • 99.50%</span>
                <h3>GOLD 99.50 (Standard Fine Bullion)</h3>
              </div>
              <p>
                Standard commercial fine gold bullion traded across Indian
                jewellery manufacturing houses and trusted retail markets.
                Includes statutory GST compliance.
              </p>
              <ul className="guide-features">
                <li><CheckCircle2 size={14} className="text-gold" /> Traditional benchmark for Indian jewellers</li>
                <li><CheckCircle2 size={14} className="text-gold" /> 99.50% certified purity with official invoice</li>
                <li><CheckCircle2 size={14} className="text-gold" /> Guaranteed transparent buyback value</li>
              </ul>
            </div>

            <div className="royal-guide-card">
              <div className="guide-card-header">
                <span className="purity-badge-pill">SILVER • 999</span>
                <h3>SILVER WITH GST (Future Feed)</h3>
              </div>
              <p>
                Pure 999 fine silver bullion benchmark per kilogram. Our technical
                pipeline is primed to stream real-time spot rates directly to this card.
              </p>
              <ul className="guide-features">
                <li><CheckCircle2 size={14} className="text-silver" /> Quoted per 1 Kilogram bar weight</li>
                <li><CheckCircle2 size={14} className="text-silver" /> Live API integration underway</li>
                <li><CheckCircle2 size={14} className="text-silver" /> Transparent spot trading margin</li>
              </ul>
            </div>
          </div>

          {/* Market Timings Bar */}
          <div className="market-timings-bar">
            <div className="timing-item">
              <Clock size={16} className="text-gold" />
              <span><strong>Market Trading Hours:</strong> Monday – Friday: 10:00 AM – 9:00 PM IST</span>
            </div>
            <div className="timing-item">
              <ShieldCheck size={16} className="text-gold" />
              <span><strong>Price Lock Policy:</strong> Rates can be locked upon confirmation with our showroom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom CTA */}
      <section className="rates-cta-section">
        <div className="section-container">
          <div className="royal-banner-card">
            <div className="banner-glow" />
            <div className="banner-content">
              <h2>Visit Our Showroom or Reserve Your Gold</h2>
              <p>
                Speak with our master bullion consultants to lock today's live rate
                for custom jewellery or physical bullion delivery.
              </p>
              <div className="banner-actions">
                <a
                  href="tel:+919079105840"
                  className="royal-btn-gold"
                >
                  Call Showroom (+91 90791 05840)
                </a>
                <a
                  href="https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20I%20would%20like%20to%20inquire%20about%20today's%20live%20bullion%20rates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="royal-btn-outline"
                >
                  WhatsApp VIP Concierge <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
