import { useState, useMemo } from "react";
import { ArrowRight, Sparkles, Scale, Info } from "lucide-react";
import useBullionRates from "../hooks/useBullionRates";
import { formatPrice } from "../utils/formatters";

const PRESETS = [
  { label: "1 Gram", value: 1, tag: "Coin" },
  { label: "8 Grams", value: 8, tag: "1 Pavan" },
  { label: "10 Grams", value: 10, tag: "Standard" },
  { label: "11.66 Grams", value: 11.66, tag: "1 Tola" },
  { label: "50 Grams", value: 50, tag: "Gold Biscuit" },
  { label: "100 Grams", value: 100, tag: "Bullion Bar" },
];

export default function PriceEstimator({ id = "estimator" }) {
  const { gold } = useBullionRates();
  const [selectedPurityIndex, setSelectedPurityIndex] = useState(0);
  const [weight, setWeight] = useState(10);

  const activePurity = gold[selectedPurityIndex] || gold[0] || null;

  const perGramRate = useMemo(() => {
    if (!activePurity?.sell) return 0;
    // Standard HB Spot bullion quotes are per 10 grams
    return activePurity.sell / 10;
  }, [activePurity]);

  const estimatedTotal = useMemo(() => {
    if (!perGramRate || weight <= 0) return 0;
    return perGramRate * weight;
  }, [perGramRate, weight]);

  return (
    <section className="royal-estimator-section" id={id}>
      <div className="section-container">
        <header className="royal-section-header">
          <div className="royal-header-badge">
            <Scale size={13} className="text-gold" />
            <span className="badge-text">PRECISION VALUATION</span>
          </div>
          <h2 className="royal-title">Live Gold Weight Estimator</h2>
          <div className="royal-divider">
            <span className="divider-line" />
            <span className="divider-gem">♦</span>
            <span className="divider-line" />
          </div>
          <p className="royal-subtitle">
            Calculate instant bullion market valuation based on real-time spot rates.
            Transparent, accurate, and with zero guesswork.
          </p>
        </header>

        <div className="estimator-vault-card">
          <div className="vault-filigree-border" />

          <div className="estimator-body-grid">
            {/* Left Controls Column */}
            <div className="estimator-input-pane">
              {/* Purity Selector */}
              <div className="field-block">
                <label className="royal-field-label">
                  <Sparkles size={13} className="text-gold" />
                  <span>Select Bullion Quality</span>
                </label>
                <div className="purity-tab-group">
                  {gold.length > 0 ? (
                    gold.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`purity-chip ${
                          idx === selectedPurityIndex ? "chip-active" : ""
                        }`}
                        onClick={() => setSelectedPurityIndex(idx)}
                      >
                        <span className="chip-name">{item.name}</span>
                        <span className="chip-rate">
                          {formatPrice(item.sell)} / 10g
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="purity-chip chip-active">
                      <span className="chip-name">GOLD 99.90 WITH GST</span>
                      <span className="chip-rate">Live Market Rate</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Weight Presets */}
              <div className="field-block">
                <label className="royal-field-label">
                  <span>Traditional Indian Weight Presets</span>
                </label>
                <div className="preset-grid">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      className={`preset-btn ${
                        weight === p.value ? "preset-active" : ""
                      }`}
                      onClick={() => setWeight(p.value)}
                    >
                      <span className="preset-grams">{p.label}</span>
                      <span className="preset-desc">{p.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Weight Slider & Number Input */}
              <div className="field-block">
                <div className="weight-header-row">
                  <label htmlFor="custom-weight" className="royal-field-label">
                    <span>Enter Custom Weight (in Grams)</span>
                  </label>
                  <span className="weight-badge">{weight} Grams</span>
                </div>

                <div className="custom-input-wrap">
                  <input
                    id="custom-weight"
                    type="number"
                    min="0.1"
                    max="1000"
                    step="0.1"
                    className="royal-number-input"
                    value={weight || ""}
                    onChange={(e) => setWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="Enter grams"
                  />
                  <span className="input-suffix">grams</span>
                </div>

                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={Math.min(100, Math.max(1, weight))}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="royal-gold-slider"
                  />
                  <div className="slider-scale">
                    <span>1g</span>
                    <span>25g</span>
                    <span>50g</span>
                    <span>75g</span>
                    <span>100g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Result Column */}
            <div className="estimator-summary-pane">
              <div className="summary-shield-watermark" />
              <div className="summary-inner">
                <span className="summary-eyebrow">ESTIMATED VALUATION</span>
                <div className="summary-primary-value">
                  {estimatedTotal > 0 ? formatPrice(estimatedTotal) : "—"}
                </div>
                <div className="summary-purity-tag">
                  {activePurity?.name || "GOLD BULLION WITH GST"}
                </div>

                <div className="breakdown-list">
                  <div className="breakdown-item">
                    <span className="b-label">Base Spot Rate</span>
                    <span className="b-value">
                      {formatPrice(perGramRate)} / gram
                    </span>
                  </div>
                  <div className="breakdown-item">
                    <span className="b-label">Calculated Weight</span>
                    <span className="b-value">{weight.toFixed(2)} grams</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="b-label">GST Compliance</span>
                    <span className="b-value text-emerald">Included in Rate</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="b-label">Making Charges</span>
                    <span className="b-value text-gold">Separate as per Design</span>
                  </div>
                </div>

                <div className="transparency-note">
                  <Info size={14} className="info-icon" />
                  <p>
                    Rates fluctuate with live MCX/Spot markets. Lock in your
                    booking rate directly at our showroom or via WhatsApp Concierge.
                  </p>
                </div>

                <a
                  href={`https://wa.me/919079105840?text=Hello%20Naveen%20Jewellers%2C%20I%20am%20inquiring%20about%20${weight}g%20of%20${encodeURIComponent(
                    activePurity?.name || "Gold"
                  )}%20quoted%20at%20${encodeURIComponent(
                    formatPrice(estimatedTotal)
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="royal-btn-gold block-btn"
                >
                  Inquire &amp; Book Rate via WhatsApp <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
