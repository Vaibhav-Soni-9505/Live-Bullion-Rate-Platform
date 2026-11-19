import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Clock,
  Radio,
} from "lucide-react";
import useBullionRates from "../hooks/useBullionRates";
import { formatPrice } from "../utils/formatters";

export default function BullionBoard({ showHeader = true, id = "rates" }) {
  const { gold, silver, fetchedAt, loading, error, isCached, refresh } =
    useBullionRates();

  return (
    <section className="royal-board-section" id={id}>
      <div className="section-container">
        {showHeader && (
          <header className="royal-section-header">
            <div className="royal-header-badge">
              <span className="live-pulse-dot" />
              <span className="badge-text">HB SPOT LIVE BULLION BENCHMARK</span>
            </div>
            <h2 className="royal-title">Official Daily Market Rates</h2>
            <div className="royal-divider">
              <span className="divider-line" />
              <span className="divider-gem">♦</span>
              <span className="divider-line" />
            </div>
            <p className="royal-subtitle">
              Verified spot market bullion rates including GST. Updated directly
              from the national bullion exchange every 30 seconds.
            </p>
          </header>
        )}

        {loading && gold.length === 0 ? (
          <div className="royal-loading-state">
            <RefreshCw className="spin text-gold" size={32} />
            <p className="loading-text">Connecting to Live Bullion Stream…</p>
          </div>
        ) : error && gold.length === 0 ? (
          <div className="royal-error-state">
            <p className="error-title">Temporary Provider Disconnection</p>
            <p className="error-desc">{error}</p>
            <button className="royal-btn-gold" onClick={refresh}>
              <RefreshCw size={14} /> Reconnect Feed
            </button>
          </div>
        ) : (
          <div className="royal-cards-wrapper">
            <div className="royal-rate-grid">
              {/* Gold Rate Cards (99.50 & 99.90) */}
              {gold.map((rate) => {
                const is999 = rate.name?.includes("99.90");
                return (
                  <article
                    key={rate.id}
                    className={`royal-rate-card ${
                      is999 ? "card-highlight-999" : ""
                    }`}
                  >
                    <div className="card-filigree-corner top-left" />
                    <div className="card-filigree-corner top-right" />
                    <div className="card-filigree-corner bottom-left" />
                    <div className="card-filigree-corner bottom-right" />

                    <div className="card-top-bar">
                      <div className="purity-seal">
                        <Sparkles size={14} className="gold-sparkle" />
                        <span>{is999 ? "24K PURE GOLD" : "STANDARD BULLION"}</span>
                      </div>
                      <span className={`live-indicator ${isCached ? "cached-indicator" : ""}`}>
                        <span className={isCached ? "cached-dot" : "live-dot"} /> {isCached ? "LAST RECORDED" : "LIVE"}
                      </span>
                    </div>

                    <h3 className="instrument-name">{rate.name}</h3>

                    <div className="price-display-box">
                      <span className="price-label">Today's Selling Rate</span>
                      <div className="price-amount">{formatPrice(rate.sell)}</div>
                      <span className="price-subtext">per 10 Grams (inclusive of GST)</span>
                    </div>

                    <div className="metrics-row">
                      <div className="metric-box">
                        <span className="metric-label">
                          <TrendingUp size={12} className="trend-up" /> Day High
                        </span>
                        <span className="metric-value">{formatPrice(rate.high)}</span>
                      </div>
                      <div className="metric-separator" />
                      <div className="metric-box">
                        <span className="metric-label">
                          <TrendingDown size={12} className="trend-down" /> Day Low
                        </span>
                        <span className="metric-value">{formatPrice(rate.low)}</span>
                      </div>
                    </div>

                    <div className="card-footer-badge">
                      <ShieldCheck size={13} />
                      <span>BIS Hallmarked • 100% Guaranteed Purity</span>
                    </div>
                  </article>
                );
              })}

              {/* Silver Rate Card (Dedicated Placeholder with clean future-ready API structure) */}
              <article className="royal-rate-card card-silver-slot">
                <div className="card-filigree-corner top-left" />
                <div className="card-filigree-corner top-right" />
                <div className="card-filigree-corner bottom-left" />
                <div className="card-filigree-corner bottom-right" />

                <div className="card-top-bar">
                  <div className="purity-seal silver-seal">
                    <Sparkles size={14} />
                    <span>FINE SILVER BULLION</span>
                  </div>
                  <span className="status-indicator-badge">SOON</span>
                </div>

                <h3 className="instrument-name">{silver.name || "SILVER WITH GST"}</h3>

                {silver.available && silver.sell ? (
                  <>
                    <div className="price-display-box">
                      <span className="price-label">Live Selling Rate</span>
                      <div className="price-amount">{formatPrice(silver.sell)}</div>
                      <span className="price-subtext">per 1 Kilogram (with GST)</span>
                    </div>

                    <div className="metrics-row">
                      <div className="metric-box">
                        <span className="metric-label">
                          <TrendingUp size={12} /> High
                        </span>
                        <span className="metric-value">{formatPrice(silver.high)}</span>
                      </div>
                      <div className="metric-separator" />
                      <div className="metric-box">
                        <span className="metric-label">
                          <TrendingDown size={12} /> Low
                        </span>
                        <span className="metric-value">{formatPrice(silver.low)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="silver-placeholder-content">
                    <div className="silver-vault-graphic">
                      <div className="silver-orbit" />
                      <Radio size={24} className="silver-antenna" />
                    </div>
                    <div className="silver-info">
                      <p className="silver-title">
                        {silver.message || "Live Feed Coming Soon"}
                      </p>
                      <p className="silver-desc">
                        Our direct silver feed integration is currently being
                        calibrated. Seamless spot rates for 1 Kg Silver bars will
                        appear here automatically.
                      </p>
                    </div>
                    <div className="silver-ready-badge">
                      <span>API SLOT CONFIGURED</span>
                    </div>
                  </div>
                )}

                <div className="card-footer-badge">
                  <Clock size={13} />
                  <span>Market Timing: 10:00 AM – 9:00 PM IST</span>
                </div>
              </article>
            </div>

            {/* Board Footer Bar */}
            <div className="royal-board-footer">
              <div className="footer-status-pill">
                <span className={isCached ? "status-ping-amber" : "status-ping"} />
                <span>
                  {isCached
                    ? `Showing last recorded rate${
                        fetchedAt
                          ? ` (${new Date(fetchedAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            })} IST)`
                          : ""
                      }`
                    : fetchedAt
                    ? `Synchronized at ${new Date(fetchedAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })} IST`
                    : "Fetching latest quotes…"}
                </span>
              </div>

              <button
                className="royal-refresh-btn"
                onClick={refresh}
                disabled={loading}
                aria-label="Refresh live rates"
              >
                <RefreshCw size={14} className={loading ? "spin" : ""} />
                <span>{loading ? "Updating Rates…" : "Refresh Quote"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
