"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { TokenDOGE } from "@web3icons/react";

import GeneralLoader from "@/components/GenreralLoader";

const OverviewStatisticsCard = dynamic(
  () => import("../../cards/OverviewStatisticsCard"),
  { ssr: false }
);
const InvestmentCharts = dynamic(() => import("./InvestmentsCharts"), {
  ssr: false,
});
const InvestmentMilestones = dynamic(() => import("./InvestmentMilestone"), {
  ssr: false,
});

const OverviewContent = ({ data }) => {
  const [overviewData, setOverviewData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTransactionLoading, setTransactionLoading] = useState(false);

  const fetchOverviewData = async () => {
    setLoading(true);
    const url = `/api/dashboard/overview/general_overview`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setLoading(false);
        if (response?.data.status === 200) {
          setOverviewData(response?.data?.data);
        } else {
          setOverviewData([]);
        }
      } else {
        setLoading(false);
        setOverviewData([]);
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const fetchRecentTransactions = async () => {
    setTransactionLoading(true);
    const url = `/api/dashboard/overview/recent_transactions`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${data?.accessToken}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setTransactionLoading(false);
        if (response?.data?.data?.message !== "No recent transactions found") {
          setRecentTransactions(response?.data?.data);
        } else {
          setTransactionLoading(false);
          setRecentTransactions([]);
        }
      } else {
        setTransactionLoading(false);
        setRecentTransactions([]);
      }

      // return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOverviewData();
    fetchRecentTransactions();
  }, []);

  return (
    <>
      {loading || isTransactionLoading ? (
        <GeneralLoader />
      ) : (
        <div className="space-y-10 md:space-y-5 ">
          <p className="text-formPrimary">Performance insights coming soon!</p>
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <OverviewStatisticsCard
              heading="Total Balance"
              des={`${overviewData?.total_balance || 0.0}`}
              stat={`+11%`}
            >
              <p>usdt</p>
            </OverviewStatisticsCard>

            <OverviewStatisticsCard
              heading="Investment Amount"
              des={` ${overviewData?.invested_amount || 0.0}`}
            >
              {" "}
              <p>usdt</p>
            </OverviewStatisticsCard>
            <OverviewStatisticsCard
              heading="Total Earnings"
              des={`${overviewData?.total_earnings || 0}`}
              stat={`+13%`}
            >
              <p>usdt</p>
            </OverviewStatisticsCard>
            <OverviewStatisticsCard
              heading="Active Investment"
              des={`${overviewData?.active_investments || 0}`}
            />
          </div>
          {/* Charts */}
          <div>
            <InvestmentCharts />
          </div>
          {/* Milestoness */}
          <div>
            <InvestmentMilestones recentTransactions={recentTransactions} />
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewContent;
