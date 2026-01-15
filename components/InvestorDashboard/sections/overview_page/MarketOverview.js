"use client";

import { useEffect, useRef } from "react";

const MarketOverview = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent multiple script injections
    if (containerRef.current.childNodes.length > 0) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BTCUSD",
      interval: "60",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      hide_top_toolbar: false,
      hide_legend: true,
      save_image: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="space-y-4">

      {/* Editorial header */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-navy">
          Live market overview
        </h3>

        <p className="text-sm text-navyMuted max-w-xl">
          Real-time reference data from global financial markets.
          Charts are provided for informational context only.
        </p>
      </div>

      {/* Chart frame */}
      <div className="bg-white rounded-2xl border border-navy/10 p-2">
        <div
          className="h-[420px] rounded-xl overflow-hidden"
          ref={containerRef}
        />
      </div>
    </section>
  );
};

export default MarketOverview;