import { useEffect, useState, useCallback, useRef } from "react";

const API_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1") +
  "/rates/bullion";

const STORAGE_KEY = "naveen_jewellers_last_bullion_rates";

/**
 * Fallback seed rates matching authentic spot prices.
 * Used when backend is offline and user has no prior browser cache.
 */
const FALLBACK_SEED = {
  gold: [
    {
      id: "gold-995",
      name: "GOLD 99.50 WITH GST",
      purity: "99.50%",
      sell: 131737,
      buy: 131450,
      high: 132100,
      low: 131400,
      unit: "10g",
    },
    {
      id: "gold-999",
      name: "GOLD 99.90 WITH GST",
      purity: "99.90%",
      sell: 132407,
      buy: 132100,
      high: 132750,
      low: 132050,
      unit: "10g",
    },
  ],
  silver: {
    name: "SILVER WITH GST",
    available: false,
    message: "Live Feed Coming Soon",
    buy: null,
    sell: null,
    high: null,
    low: null,
  },
  fetchedAt: null,
};

/**
 * Retrieve cached rates from localStorage with graceful fallback
 */
function getInitialRates() {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.gold) && parsed.gold.length > 0) {
          return {
            gold: parsed.gold,
            silver: parsed.silver || FALLBACK_SEED.silver,
            fetchedAt: parsed.fetchedAt || null,
            isCached: true,
          };
        }
      }
    } catch {
      // localStorage might be unavailable or corrupt
    }
  }

  return {
    gold: FALLBACK_SEED.gold,
    silver: FALLBACK_SEED.silver,
    fetchedAt: FALLBACK_SEED.fetchedAt,
    isCached: true,
  };
}

/**
 * Shared hook for fetching live bullion rates with offline cache fallback.
 * If the backend is unreachable or stopped, always serves the last recorded rates.
 */
export default function useBullionRates() {
  const initial = useRef(getInitialRates()).current;
  const [gold, setGold] = useState(initial.gold);
  const [silver, setSilver] = useState(initial.silver);
  const [fetchedAt, setFetchedAt] = useState(initial.fetchedAt);
  const [isCached, setIsCached] = useState(initial.isCached);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const refreshControllerRef = useRef(null);

  // Fetch on mount with proper cleanup
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function initialFetch() {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Unable to fetch bullion rates.");

        const result = await response.json();

        if (!ignore && result.success && result.data) {
          const freshGold = result.data.gold ?? [];
          const freshSilver = result.data.silver || FALLBACK_SEED.silver;
          const freshTime = result.fetchedAt || new Date().toISOString();

          setGold(freshGold);
          setSilver(freshSilver);
          setFetchedAt(freshTime);
          setIsCached(false);
          setError("");

          // Persist to local storage for offline resilience
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                gold: freshGold,
                silver: freshSilver,
                fetchedAt: freshTime,
                savedAt: Date.now(),
              })
            );
          } catch {
            // ignore localStorage quota errors
          }
        }
      } catch (err) {
        if (!ignore && err.name !== "AbortError") {
          // Keep existing cached gold/silver prices and mark as cached
          setIsCached(true);
          setError(err.message || "Backend offline. Displaying last recorded rates.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    initialFetch();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  // Manual refresh handler
  const refresh = useCallback(async () => {
    refreshControllerRef.current?.abort();
    const controller = new AbortController();
    refreshControllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Unable to fetch bullion rates.");

      const result = await response.json();

      if (!controller.signal.aborted && result.success && result.data) {
        const freshGold = result.data.gold ?? [];
        const freshSilver = result.data.silver || FALLBACK_SEED.silver;
        const freshTime = result.fetchedAt || new Date().toISOString();

        setGold(freshGold);
        setSilver(freshSilver);
        setFetchedAt(freshTime);
        setIsCached(false);

        // Persist to local storage
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              gold: freshGold,
              silver: freshSilver,
              fetchedAt: freshTime,
              savedAt: Date.now(),
            })
          );
        } catch {
          // ignore
        }
      }
    } catch (err) {
      if (err.name !== "AbortError" && !controller.signal.aborted) {
        // Keep existing cached gold/silver prices!
        setIsCached(true);
        setError(err.message || "Backend offline. Displaying last recorded rates.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  return { gold, silver, fetchedAt, loading, error, isCached, refresh };
}
