"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GeneralLoader from "@/components/GenreralLoader";

const badgeColors = {
  None: "bg-greyBg text-grey",
  Bronze: "bg-orange-100 text-orange-700",
  Silver: "bg-gray-200 text-gray-800",
  Gold: "bg-yellow-100 text-yellow-700",
};

export default function ReferralBadge({ data }) {
  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState(null);

  const fetchRank = async () => {
    try {
      const res = await axios.get(
        "/api/dashboard/referrals/rank",
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );

      setRank(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRank();
  }, []);

  if (loading) return <GeneralLoader />;

  return (
    <div className="bg-backgroundPrimary rounded-xl p-5 border flex justify-between items-center">
      <div>
        <p className="text-xs text-grey">Referral Rank</p>
        <p className="text-lg font-semibold">{rank.rank}</p>
        <p className="text-xs text-grey">
          {rank.activeReferrals} active referrals · {rank.totalReferralEarnings} USDT earned
        </p>
      </div>

      <span
        className={`px-4 py-1 rounded-full text-sm font-medium ${badgeColors[rank.rank]}`}
      >
        {rank.rank}
      </span>
    </div>
  );
}