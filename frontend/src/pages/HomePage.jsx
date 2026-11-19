import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Crown,
  Scale,
  MapPin,
  Clock,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import BullionBoard from "../components/BullionBoard";
import PriceEstimator from "../components/PriceEstimator";
import useBullionRates from "../hooks/useBullionRates";
import { formatPrice } from "../utils/formatters";
import naveenLogo from "../assets/naveen-jewellers-logo.png";

/* ── Royal Hero ────────────────────────────────────── */

function RoyalHero() {
  const { gold, loading, isCached } = useBullionRates();
  const rate995 = gold.find((r) => r.name?.includes("99.50")) || gold[0];
  const rate999 = gold.find((r) => r.name?.includes("99.90")) || gold[1];

  return (
    <section className="royal-hero" id="home">
      <div className="hero-ambient-glow" />

      <div className="section-container hero-inner">
        {/* Main Content Column */}
        <div className="hero-text-col">
          <div className="royal-crest-pill">
            <Crown size={13} className="text-gold" />
            <span>ESTABLISHED 2000 · HERITAGE OF PURITY</span>
          </div>

          <h1 className="hero-headline">
            Where Pure Gold
            <br />
            Meets <span className="headline-gold-shimmer">Royal Heritage.</span>
          </h1>

          {/* Mobile Centerpiece Logo Emblem (Positioned in middle on mobile) */}
          <div className="hero-mobile-logo-wrap" aria-hidden="true">
            <div className="logo-ambient-halo" />
            <img
              src={naveenLogo}
              alt="Naveen Jewellers"
              className="hero-simple-logo"
            />
          </div>

          <p className="hero-statement">
            For over two decades, Naveen Jewellers has stood as an epitome of
            uncompromising purity, traditional Indian craftsmanship, and
            transparent live bullion pricing in Jodhpur, Rajasthan.
          </p>

          {/* Live Bullion Glance Spotlight (Instant Spot Pricing & Direct Link) */}
          <div className="hero-rates-glance">
            <div className="glance-header">
              <span className={`glance-live-badge ${isCached ? "glance-cached-badge" : ""}`}>
                <span className={isCached ? "cached-dot" : "live-dot"} />{" "}
                {isCached ? "LAST RECORDED RATE" : "HB SPOT LIVE"}
              </span>
              <span className="glance-subtext">Click card for Live Rates Board ↗</span>
            </div>

            <div className="glance-grid">
              <Link to="/rates" className="glance-item" title="Click to open Live Bullion Rates">
                <div className="glance-item-top">
                  <span className="glance-item-name">GOLD 99.50</span>
                  <span className="glance-item-purity">24K Bullion</span>
                </div>
                <div className="glance-item-price">
                  {rate995?.sell ? formatPrice(rate995.sell) : loading ? "Loading..." : "₹ 89,450*"}
                </div>
                <div className="glance-item-foot">
                  <TrendingUp size={11} className="trend-up" /> Tap for Live Bullion Rates ↗
                </div>
              </Link>

              <Link to="/rates" className="glance-item glance-item-highlight" title="Click to open Live Bullion Rates">
                <div className="glance-item-top">
                  <span className="glance-item-name">GOLD 99.90</span>
                  <span className="glance-item-purity gold-tag">99.9% Pure</span>
                </div>
                <div className="glance-item-price text-gold">
                  {rate999?.sell ? formatPrice(rate999.sell) : loading ? "Loading..." : "₹ 89,800*"}
                </div>
                <div className="glance-item-foot">
                  <TrendingUp size={11} className="trend-up" /> Tap for Live Bullion Rates ↗
                </div>
              </Link>
            </div>
          </div>

          {/* Action Button */}
          <div className="hero-button-group">
            <Link to="/contact" className="royal-btn-gold">
              Showroom Concierge &amp; Visit <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Trust Line */}
          <div className="hero-purity-guarantee">
            <div className="guarantee-badge">
              <ShieldCheck size={14} className="text-gold" />
              <span>100% BIS Hallmarked</span>
            </div>
            <div className="guarantee-dot" />
            <div className="guarantee-badge">
              <Award size={14} className="text-gold" />
              <span>HB Spot Live Quotes</span>
            </div>
            <div className="guarantee-dot" />
            <div className="guarantee-badge">
              <Crown size={14} className="text-gold" />
              <span>25+ Years of Trust</span>
            </div>
          </div>
        </div>

        {/* Brand Visual Column (The Clean, Royal Emblem) */}
        <div className="hero-visual-col">
          <div className="hero-simple-logo-wrap">
            <div className="logo-ambient-halo" />
            <img
              src={naveenLogo}
              alt="Naveen Jewellers - Since 2000"
              className="hero-simple-logo"
            />
          </div>
        </div>
      </div>

      {/* Hero Bottom Infinite Live Market Ticker */}
      <div className="hero-ticker-ribbon">
        <div className="ticker-marquee-track">
          <div className="ticker-cluster">
            <span className="ticker-pill"><span className="live-dot" /> HB SPOT STREAM</span>
            <span>GOLD 99.50 WITH GST</span>
            <span className="ticker-gem">♦</span>
            <span>GOLD 99.90 WITH GST</span>
            <span className="ticker-gem">♦</span>
            <span>SILVER FEED PREVIEW</span>
            <span className="ticker-gem">♦</span>
            <span>100% BIS HALLMARKED PURITY</span>
            <span className="ticker-gem">♦</span>
            <span>TRANSPARENT SPOT PRICING</span>
            <span className="ticker-gem">♦</span>
          </div>
          {/* Duplicate track for seamless infinite marquee loop */}
          <div className="ticker-cluster" aria-hidden="true">
            <span className="ticker-pill"><span className="live-dot" /> HB SPOT STREAM</span>
            <span>GOLD 99.50 WITH GST</span>
            <span className="ticker-gem">♦</span>
            <span>GOLD 99.90 WITH GST</span>
            <span className="ticker-gem">♦</span>
            <span>SILVER FEED PREVIEW</span>
            <span className="ticker-gem">♦</span>
            <span>100% BIS HALLMARKED PURITY</span>
            <span className="ticker-gem">♦</span>
            <span>TRANSPARENT SPOT PRICING</span>
            <span className="ticker-gem">♦</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Royal Heritage & 4 Trust Pillars ──────────────── */

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "BIS Hallmark Certified",
    desc: "Every gram of gold is certified under official Bureau of Indian Standards (BIS) hallmarking with distinct HUID traceability.",
  },
  {
    icon: Award,
    title: "Direct HB Spot Bullion Rates",
    desc: "We stream live market rates without inflated retail spreads, giving you complete clarity on gold and silver pricing.",
  },
  {
    icon: Crown,
    title: "Quarter-Century Legacy",
    desc: "Founded in 2000 in Jodhpur, we have served thousands of families across generations for bridal jewelry, investments, and custom orders.",
  },
  {
    icon: Scale,
    title: "Guaranteed Purity & Buyback",
    desc: "Full weight transparency and verified bullion value backing every sovereign coin, bar, and handcrafted heirloom.",
  },
];

function HeritageSection() {
  return (
    <section className="royal-heritage-section" id="heritage">
      <div className="section-container">
        <header className="royal-section-header">
          <div className="royal-header-badge">
            <Crown size={13} className="text-gold" />
            <span className="badge-text">HERITAGE OF PURITY</span>
          </div>
          <h2 className="royal-title">The Four Pillars of Royal Trust</h2>
          <div className="royal-divider">
            <span className="divider-line" />
            <span className="divider-gem">♦</span>
            <span className="divider-line" />
          </div>
          <p className="royal-subtitle">
            Jewellery is sacred tradition and sovereign wealth. Discover why
            discerning families have trusted us since 2000.
          </p>
        </header>

        <div className="heritage-grid">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <article className="heritage-card" key={title}>
              <div className="card-filigree-corner top-left" />
              <div className="card-filigree-corner top-right" />
              <div className="card-filigree-corner bottom-left" />
              <div className="card-filigree-corner bottom-right" />

              <div className="pillar-icon-box">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── VIP Showroom Invitation Banner ────────────────── */

function ShowroomInvite() {
  return (
    <section className="showroom-invite-section">
      <div className="section-container">
        <div className="invite-luxury-card">
          <div className="card-filigree-corner top-left" />
          <div className="card-filigree-corner top-right" />
          <div className="card-filigree-corner bottom-left" />
          <div className="card-filigree-corner bottom-right" />

          <div className="invite-grid">
            <div className="invite-text">
              <span className="invite-kicker">SHOWROOM CONSULTATION</span>
              <h2>Experience the Brilliance in Person</h2>
              <p>
                Visit our boutique showroom in Jodhpur to view physical bullion bars, explore
                bespoke bridal artistry, or discuss bullion investments with our
                master jewelers.
              </p>

              <div className="invite-meta-badges">
                <span className="meta-badge">
                  <MapPin size={13} /> Subhash Chowk, Ratanada, Jodhpur, Rajasthan
                </span>
                <span className="meta-badge">
                  <Clock size={13} /> Mon – Sun: 10:30 AM – 8:30 PM
                </span>
              </div>
            </div>

            <div className="invite-actions">
              <Link to="/contact" className="royal-btn-gold">
                Visit Showroom <ArrowUpRight size={15} />
              </Link>
              <a
                href="https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20I%20would%20like%20to%20inquire%20about%20a%20showroom%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="royal-btn-wa"
              >
                <MessageCircle size={15} /> WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Home Page Component ──────────────────────── */

export default function HomePage() {
  return (
    <main className="royal-home-page">
      <RoyalHero />
      <BullionBoard id="rates" />
      <PriceEstimator id="estimator" />
      <HeritageSection />
      <ShowroomInvite />
    </main>
  );
}
