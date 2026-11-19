import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/place/Naveen+jewellers/@26.2757178,73.0322578,17z/data=!3m1!4b1!4m6!3m5!1s0x39418c5a6701cf95:0xcd840f732112420f!8m2!3d26.2757178!4d73.0322578!16s%2Fg%2F11b6bctdxt?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D";

const EMBED_MAP_SRC =
  "https://maps.google.com/maps?q=26.2757178,73.0322578&hl=en&z=17&output=embed";

export default function ContactPage() {
  return (
    <main className="royal-contact-page">
      {/* Royal Subpage Hero */}
      <section className="subpage-hero">
        <div className="section-container text-center">
          <div className="royal-header-badge">
            <Sparkles size={13} className="text-gold" />
            <span className="badge-text">EXCLUSIVE SHOWROOM CONCIERGE</span>
          </div>
          <h1 className="subpage-title">Visit Naveen Jewellers</h1>
          <div className="royal-divider">
            <span className="divider-line" />
            <span className="divider-gem">♦</span>
            <span className="divider-line" />
          </div>
          <p className="subpage-desc">
            Visit our flagship jewellery showroom in Jodhpur, Rajasthan, or connect directly
            with our master bullion consultants via phone or WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="contact-section-body">
        <div className="section-container contact-info-showcase">
          {/* Quick Direct Concierge Action Cards */}
          <div className="direct-channels-grid">
            {/* Phone Call Card */}
            <div className="royal-channel-card phone-channel">
              <div className="channel-icon-wrap phone-icon-wrap">
                <Phone size={24} />
              </div>
              <div className="channel-info">
                <span className="channel-kicker">SHOWROOM HOTLINE</span>
                <h3>+91 90791 05840</h3>
                <p>Call directly for live bullion rate locks, gold availability, and showroom appointments.</p>
              </div>
              <a href="tel:+919079105840" className="royal-btn-gold channel-cta">
                Call Showroom <Phone size={14} />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="royal-channel-card wa-channel">
              <div className="channel-icon-wrap wa-icon-wrap">
                <MessageCircle size={24} />
              </div>
              <div className="channel-info">
                <span className="channel-kicker wa-kicker">INSTANT CONCIERGE</span>
                <h3>WhatsApp VIP Desk</h3>
                <p>Chat directly with our jewellers for photos of collections, rate inquiries, and orders.</p>
              </div>
              <a
                href="https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20and%20live%20gold%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="royal-btn-wa channel-cta"
              >
                Chat on WhatsApp <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Showroom Information & Interactive Map */}
          <div className="showroom-location-card">
            <div className="card-filigree-corner top-left" />
            <div className="card-filigree-corner top-right" />
            <div className="card-filigree-corner bottom-left" />
            <div className="card-filigree-corner bottom-right" />

            <div className="location-grid">
              {/* Showroom Specifics */}
              <div className="location-details-col">
                <div className="location-section-title">
                  <span className="pill-landmark">FLAGSHIP SHOWROOM</span>
                  <h2>Naveen Jewellers</h2>
                  <p className="showroom-motto">A Legacy of Purity &amp; Trust in Jodhpur Since 2000</p>
                </div>

                <div className="specs-list">
                  <div className="spec-item">
                    <div className="spec-icon-box">
                      <MapPin size={22} className="text-gold" />
                    </div>
                    <div>
                      <strong>Showroom Address</strong>
                      <p>
                        Opposite Krishna Mandir Road, Subhash Chowk,
                        <br />
                        Ratanada, Jodhpur, Rajasthan — 342011
                      </p>
                      <span className="landmark-tag">Landmark: Opp. Krishna Mandir</span>
                    </div>
                  </div>

                  <div className="spec-divider-line" />

                  <div className="spec-item">
                    <div className="spec-icon-box">
                      <Clock size={22} className="text-gold" />
                    </div>
                    <div>
                      <strong>Operating Hours</strong>
                      <p>
                        <strong>Monday – Sunday:</strong> 10:30 AM – 8:30 PM
                      </p>
                      <span className="open-days-tag">Open All 7 Days a Week</span>
                    </div>
                  </div>

                  <div className="spec-divider-line" />

                  <div className="spec-item">
                    <div className="spec-icon-box">
                      <ShieldCheck size={22} className="text-gold" />
                    </div>
                    <div>
                      <strong>Government Certified Standards</strong>
                      <p>
                        100% BIS Hallmarked Jewellery • Real-Time HB Spot Bullion Benchmark
                      </p>
                    </div>
                  </div>
                </div>

                <div className="location-actions">
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="royal-btn-gold"
                  >
                    Open in Google Maps <ArrowUpRight size={15} />
                  </a>
                  <a
                    href="https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20please%20share%20directions%20to%20your%20showroom."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="royal-btn-outline"
                  >
                    Get Directions via WhatsApp
                  </a>
                </div>
              </div>

              {/* Embedded Live Google Map */}
              <div className="location-map-col">
                <div className="map-frame-wrapper">
                  <iframe
                    title="Naveen Jewellers Showroom Location"
                    src={EMBED_MAP_SRC}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="embedded-google-map"
                  />
                  <div className="map-badge-overlay">
                    <Compass size={14} className="text-gold" />
                    <span>Jodhpur, Rajasthan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
