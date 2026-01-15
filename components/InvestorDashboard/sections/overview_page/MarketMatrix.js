"use client";

import { useEffect, useRef } from "react";

const MarketMatrix = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.childNodes.length > 0) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "420",
      currencies: [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "CNY",
        "BTC",
        "ETH",
        "LTC",
      ],
      isTransparent: false,
      colorTheme: "light",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="space-y-4">

      {/* Editorial header */}
      <div className="space-y-1">

        <h3 className="text-sm font-medium text-navy">
          Global market matrix
        </h3>

        <p className="text-sm text-navyMuted max-w-xl">
          Cross-currency and crypto price relationships presented
          for comparative analysis and macro context.
        </p>
      </div>

      {/* Matrix frame */}
      <div className="bg-white rounded-2xl border border-navy/10 p-2">
        <div
          ref={containerRef}
          className="rounded-xl overflow-hidden"
        />
      </div>

    </section>
  );
};

export default MarketMatrix;