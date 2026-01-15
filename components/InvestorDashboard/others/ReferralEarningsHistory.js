"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GeneralLoader from "@/components/GenreralLoader";

export default function ReferralEarningsHistory({ data }) {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "/api/dashboard/referrals/earnings",
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );

      setEarnings(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch referral earnings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <GeneralLoader />;

  if (earnings.length === 0) {
    return (
      <div className="text-center py-16 text-sm text-grey">
        No referral earnings yet.
      </div>
    );
  }

  return (
    <div className="bg-backgroundPrimary rounded-xl border overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="bg-[#F9FAFB]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase">
              Generation
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase">
              Percentage
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase">
              Amount
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium uppercase">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y text-sm">
          {earnings.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4">
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                Level {item.generation}
              </td>

              <td className="px-6 py-4">
                {item.percent}%
              </td>

              <td className="px-6 py-4 font-medium">
                +{item.amount} USDT
              </td>

              <td className="px-6 py-4">
                {item.capped ? (
                  <span className="text-orange-500 text-xs">
                    Capped
                  </span>
                ) : (
                  <span className="text-green-600 text-xs">
                    Paid
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
