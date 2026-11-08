
import { useCallback, useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

const initialMarkets = [
  { pair: "EUR/USD", positive: null },
  { pair: "USD/JPY", positive: null },
  { pair: "GBP/USD", positive: null },
  { pair: "USD/CHF", positive: null },
  { pair: "EUR/GBP", positive: null },
  { pair: "AUD/USD", positive: null },
  { pair: "USD/CAD", positive: null },
];
console.log("API_KEY:", API_KEY); // Log the API key to verify it's being read correctly
function MarketItem({ market }) {
  const price = market.price;
  const change = Number(market.change);
  const hasChange = market.change !== null && Number.isFinite(change);
  const positive = hasChange ? change >= 0 : null;

  return (
    <div className="flex h-10 shrink-0 items-center gap-2 border-r border-[#292929] px-3 font-mono text-[11px] tracking-wide sm:px-4">
      <span className="whitespace-nowrap text-[#A3A3A3]">
        {market.pair}
      </span>

      <span className="whitespace-nowrap text-[#F5F5F5]">
        {price != null
          ? Number(price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            })
          : "—"}
      </span>

      <span
        className={`whitespace-nowrap ${
          positive === null
            ? "text-[#737373]"
            : positive
              ? "text-[#39D353]"
              : "text-[#F05252]"
        }`}
      >
        {hasChange
          ? `${positive ? "▲" : "▼"} ${positive ? "+" : ""}${change.toFixed(2)}%`
          : "—"}
      </span>
    </div>
  );
}

export default function LiveMarkets() {
  const [markets, setMarkets] = useState(initialMarkets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchMarkets = useCallback(async () => {
    if (!API_KEY) {
      setError("Add your Twelve Data API key to the .env file.");
      setLoading(false);
      return;
    }

    setError("");

    try {
      const results = await Promise.all(
        initialMarkets.map(async (market) => {
          const url = new URL(
            "https://api.twelvedata.com/quote"
          );

          url.searchParams.set("symbol", market.pair);
          url.searchParams.set("apikey", API_KEY);

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Request failed for ${market.pair}`);
          }

          const data = await response.json();

          if (data.status === "error" || data.code) {
            throw new Error(
              data.message || `Could not fetch ${market.pair}`
            );
          }

          const price = Number(data.close);
          const change = Number(data.percent_change);

          if (!Number.isFinite(price)) {
            throw new Error(`Invalid price for ${market.pair}`);
          }

          return {
            ...market,
            price,
            change: Number.isFinite(change) ? change : null,
          };
        })
      );

      setMarkets(results);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Unable to fetch market data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();

    const interval = setInterval(fetchMarkets, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchMarkets]);

  // Duplicate the list to create a continuous ticker.
  const tickerMarkets = [...markets, ...markets];

  return (
    <div className="flex h-10 w-full overflow-hidden border-y border-[#292929] bg-[#111111]">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-[#CEF739] px-3 font-mono text-[10px] font-bold uppercase tracking-wider text-black sm:px-4">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            error ? "bg-red-600" : "animate-pulse bg-black"
          }`}
        />
        Live Markets
      </div>

      <div className="relative min-w-0 flex-1 overflow-hidden">
        {loading && !lastUpdated ? (
          <div className="flex h-full items-center px-4 font-mono text-xs text-[#A3A3A3]">
            Fetching market data...
          </div>
        ) : error && !lastUpdated ? (
          <div className="flex h-full items-center gap-3 px-4 font-mono text-xs text-red-400">
            <span>{error}</span>
            <button
              onClick={fetchMarkets}
              className="underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="market-ticker flex w-max">
            {tickerMarkets.map((market, index) => (
              <MarketItem
                key={`${market.pair}-${index}`}
                market={market}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden shrink-0 items-center border-l border-[#292929] px-3 font-mono text-[10px] text-[#737373] lg:flex">
        {loading
          ? "UPDATING..."
          : error
            ? "UPDATE FAILED"
            : lastUpdated
              ? `UPDATED ${lastUpdated.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "CONNECTING..."}
      </div>
    </div>
  );
}

