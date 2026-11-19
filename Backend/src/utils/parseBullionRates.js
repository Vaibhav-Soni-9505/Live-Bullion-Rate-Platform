// Gold instrument names the frontend is allowed to display
const ALLOWED_GOLD_NAMES = [
  "GOLD 99.50 WITH GST",
  "GOLD 99.90 WITH GST",
];

const parseBullionRates = (rawData) => {
  if (typeof rawData !== "string") {
    throw new Error("Invalid bullion response");
  }

  const rows = rawData
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);

  const goldRates = [];

  for (const row of rows) {
    const columns = row.split("\t").map((value) => value.trim());

    // Only process detailed GOLD instruments.
    if (!/^\d+$/.test(columns[0])) continue;
    if (!columns[1]?.startsWith("GOLD ") || columns[1] === "GOLD COSTING") continue;

    const [id, name, buy, sell, high, low] = columns;

    const parsePrice = (value) => {
      if (!value || value === "-") return null;

      const price = Number(value);
      return Number.isFinite(price) ? price : null;
    };

    goldRates.push({
      id,
      name,
      buy: parsePrice(buy),
      sell: parsePrice(sell),
      high: parsePrice(high),
      low: parsePrice(low),
    });
  }

  return goldRates;
};

/**
 * Filter parsed gold rates to only the two customer-facing GST variants.
 * Comparison is case-insensitive and trim-safe.
 */
const filterGoldRates = (rates) =>
  rates.filter((rate) =>
    ALLOWED_GOLD_NAMES.includes(rate.name?.trim().toUpperCase())
  );

/**
 * Silver placeholder until a live silver API is integrated.
 * Swap `available` to true and populate prices once the feed is connected.
 */
const buildSilverPlaceholder = () => ({
  name: "SILVER WITH GST",
  buy: null,
  sell: null,
  high: null,
  low: null,
  available: false,
  message: "Live Feed Coming Soon",
});

export default parseBullionRates;
export { filterGoldRates, buildSilverPlaceholder };
