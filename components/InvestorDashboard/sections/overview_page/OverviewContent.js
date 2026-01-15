"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import GeneralLoader from "@/components/GenreralLoader";

// Cards
const OverviewStatisticsCard = dynamic(
  () => import("../../cards/OverviewStatisticsCard"),
  { ssr: false }
);

// Market widgets
const MarketOverview = dynamic(
  () => import("./MarketOverview"),
  { ssr: false }
);

const MarketMatrix = dynamic(
  () => import("./MarketMatrix"),
  { ssr: false }
);

const OverviewContent = ({ data }) => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOverviewData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/dashboard/overview/general_overview`,
        {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        }
      );

      if (response.status === 200 && response?.data?.status === 200) {
        setOverviewData(response.data.data);
      } else {
        setOverviewData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  if (loading) return <GeneralLoader />;

  return (
    <div className="space-y-14">

      {/* ================= ACCOUNT SNAPSHOT ================= */}
      <section>
        <p className="text-xs uppercase tracking-wide text-navyMuted mb-4">
          Account snapshot
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <OverviewStatisticsCard
            heading="Wallet balance"
            des={overviewData?.total_balance || 0}
            accent="gold"
          >
            <p className="text-xs text-navyMuted">USDT</p>
          </OverviewStatisticsCard>

          <OverviewStatisticsCard
            heading="Total invested"
            des={overviewData?.invested_amount || 0}
          >
            <p className="text-xs text-navyMuted">USDT</p>
          </OverviewStatisticsCard>

          <OverviewStatisticsCard
            heading="Total profits"
            des={overviewData?.total_earnings || 0}
            accent="gold"
          >
            <p className="text-xs text-navyMuted">USDT</p>
          </OverviewStatisticsCard>

          <OverviewStatisticsCard
            heading="Active allocations"
            des={overviewData?.active_investments || 0}
          />
        </div>
      </section>

      {/* ================= EARNINGS STRUCTURE ================= */}
      <section className="rounded-xl border border-navy/10 bg-navy/5 p-6">
        <p className="text-xs uppercase tracking-wide text-navyMuted mb-3">
          Earnings structure
        </p>

        <ul className="space-y-2 text-sm text-navy">
          {[
            "Earnings accrue at a fixed daily rate on weekdays only",
            "Each allocation has a predefined ROI cap",
            "Allocations close automatically once the cap is reached",
            "Referral earnings contribute toward the same cap",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= MARKET OVERVIEW ================= */}
      <section>
        <p className="text-xs uppercase tracking-wide text-navyMuted mb-4">
          Market overview
        </p>
        <MarketOverview />
      </section>

      {/* ================= MARKET MATRIX ================= */}
      <section>
        <p className="text-xs uppercase tracking-wide text-navyMuted mb-4">
          Market fundamentals
        </p>
        <MarketMatrix />
      </section>

    </div>
  );
};

export default OverviewContent;