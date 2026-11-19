import config from "../config/config.js";
import parseBullionRates from "../utils/parseBullionRates.js";

const CACHE_REFRESH_INTERVAL = 30 * 1000;

// In-memory cache
let cachedGoldRates = null;
let fetchedAt = null;
let refreshPromise = null;
let refreshTimer = null;

// Fetch fresh rates from HB Spot
const fetchGoldRatesFromProvider = async () => {
  const url = new URL(config.HB_SPOT_URL);
  url.searchParams.set("_", Date.now().toString());

  let response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error("Gold rate fetch failed:", error.message);

    const providerError = new Error(
      "Unable to retrieve the latest gold rates"
    );

    providerError.statusCode =
      error.name === "TimeoutError" || error.name === "AbortError"
        ? 504
        : 502;

    throw providerError;
  }

  if (!response.ok) {
    console.error(
      "Gold rate request failed with status:",
      response.status
    );

    const error = new Error(
      "Unable to retrieve the latest gold rates"
    );

    error.statusCode = 502;
    throw error;
  }

  const rawData = await response.text();

  if (!rawData.trim()) {
    console.error("Gold rate service returned an empty response");

    const error = new Error(
      "Gold rates are temporarily unavailable"
    );

    error.statusCode = 502;
    throw error;
  }

  let goldRates;

  try {
    goldRates = parseBullionRates(rawData);
  } catch (error) {
    console.error("Gold rate parsing failed:", error.message);

    const parseError = new Error(
      "Unable to process the latest gold rates"
    );

    parseError.statusCode = 502;
    throw parseError;
  }

  if (goldRates.length === 0) {
    console.error("No valid gold rates found in the response");

    const error = new Error(
      "Gold rates are temporarily unavailable"
    );

    error.statusCode = 502;
    throw error;
  }

  return goldRates;
};

// Refresh cache without allowing duplicate provider requests
const refreshGoldRates = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const goldRates = await fetchGoldRatesFromProvider();

    // Update cache only after a successful fetch
    cachedGoldRates = goldRates;
    fetchedAt = new Date();

    console.log("Gold rates cache refreshed successfully");

    return {
      goldRates: cachedGoldRates,
      fetchedAt,
    };
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

// Start cache refresh when backend starts
const startGoldRateCache = () => {
  if (refreshTimer) {
    return;
  }

  // Initial fetch
  refreshGoldRates().catch((error) => {
    console.error("Initial gold rate cache refresh failed:", error.message);
  });

  // Refresh every 30 seconds
  refreshTimer = setInterval(() => {
    refreshGoldRates().catch((error) => {
      console.error("Gold rate cache refresh failed:", error.message);
    });
  }, CACHE_REFRESH_INTERVAL);

  // Allow Node.js to exit normally if no other work remains
  refreshTimer.unref?.();
};

// Return cached rates to API controllers
const getCachedGoldRates = async () => {
  // If the initial fetch hasn't completed, wait for it
  if (!cachedGoldRates) {
    await refreshGoldRates();
  }

  return {
    goldRates: cachedGoldRates,
    fetchedAt,
    isStale:
      Date.now() - fetchedAt.getTime() > CACHE_REFRESH_INTERVAL,
  };
};

export {
  startGoldRateCache,
  getCachedGoldRates,
};
