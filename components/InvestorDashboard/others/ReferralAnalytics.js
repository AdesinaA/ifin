"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GeneralLoader from "@/components/GenreralLoader";

const EMPTY_ANALYTICS = {
  totalReferralEarnings: 0,
  directReferrals: 0,
  activeReferrals: 0,
  earningsByGeneration: [],
};

export default function ReferralAnalytics({ data }) {
  const [analytics, setAnalytics] = useState(EMPTY_ANALYTICS);
  const [loading, setLoading] = useState(true);

  const token = data?.accessToken;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/api/dashboard/referral-analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.success && res.data?.data) {
          setAnalytics(res.data.data);
        } else {
          setAnalytics(EMPTY_ANALYTICS);
        }
      } catch (error) {
        console.error("Referral analytics fetch failed:", error);
        setAnalytics(EMPTY_ANALYTICS);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  /* ============================
     LOADING STATE
  ============================ */
  if (loading) {
    return <GeneralLoader />;
  }

  /* ============================
     SAFE RENDER
  ============================ */
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Earnings */}
      <div className="bg-backgroundPrimary rounded-xl p-4 border">
        <p className="text-xs text-grey">Total Referral Earnings</p>
        <p className="text-xl font-semibold">
          {analytics.totalReferralEarnings.toFixed(2)} USDT
        </p>
      </div>

      {/* Direct Referrals */}
      <div className="bg-backgroundPrimary rounded-xl p-4 border">
        <p className="text-xs text-grey">Direct Referrals</p>
        <p className="text-xl font-semibold">
          {analytics.directReferrals}
        </p>
      </div>

      {/* Active Referrals */}
      <div className="bg-backgroundPrimary rounded-xl p-4 border">
        <p className="text-xs text-grey">Active Referrals</p>
        <p className="text-xl font-semibold">
          {analytics.activeReferrals}
        </p>
      </div>
    </div>
  );
}