"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Components & Hooks
import useToggle from "@/hooks/UseToggle";
import GeneralLoader from "@/components/GenreralLoader";
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import OverviewStatisticsCard from "../cards/OverviewStatisticsCard";
import InvestmentTableActionDropdown from "../cards/InvestmentTableActionDropdown";
import InvestmentDetailsModal from "../modals/InvestmentsDetailsModal";
import InvestmentShareModal from "../modals/InvestmentShareModal";

// Icons
import { MagnifyingGlass, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const ITEMS_PER_PAGE = 5;

const DashboardInvestments = ({ data }) => {
  /* =======================
     STATE
  ======================== */

  const [overviewData, setOverviewData] = useState(null);

  const [investments, setInvestments] = useState({
    active: [],
    completed: [],
  });

  const [loading, setLoading] = useState(true);
  const [overviewLoading, setOverviewLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState({
    all: 1,
    active: 1,
    completed: 1,
  });

  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const { isOpen: isViewDetails, toggle: toggleViewDetail } = useToggle();
  const { isOpen: isShareModal, toggle: toggleShareModal } = useToggle();

  const token = data?.accessToken;

  /* =======================
     FETCH OVERVIEW
  ======================== */

  const fetchOverviewData = async () => {
    try {
      const res = await axios.get(
        "/api/dashboard/overview/general_overview",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOverviewData(res.data?.data ?? null);
    } catch (err) {
      console.error("Overview fetch error:", err);
      setOverviewData(null);
    } finally {
      setOverviewLoading(false);
    }
  };

  /* =======================
     FETCH INVESTMENTS
  ======================== */

  const fetchInvestmentData = async () => {
    try {
      const res = await axios.get("/api/dashboard/investments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInvestments({
        active: res.data?.active || [],
        completed: res.data?.completed || [],
      });
    } catch (err) {
      console.error("Investment fetch error:", err);
      setInvestments({ active: [], completed: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
    fetchInvestmentData();
  }, []);

  /* =======================
     DERIVED DATA
  ======================== */

  const allInvestments = [
    ...investments.active,
    ...investments.completed,
  ];

  const investmentsByTab =
    activeTab === "active"
      ? investments.active
      : activeTab === "completed"
      ? investments.completed
      : allInvestments;

  const filteredInvestments = investmentsByTab.filter((inv) => {
    const q = search.toLowerCase();
    return (
      inv.package_name?.toLowerCase().includes(q) ||
      String(inv.invested_amount).includes(q) ||
      String(inv.earned).includes(q)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvestments.length / ITEMS_PER_PAGE)
  );

  const startIndex =
    (currentPage[activeTab] - 1) * ITEMS_PER_PAGE;

  const paginatedInvestments = filteredInvestments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* =======================
     HANDLERS
  ======================== */

  const handlePageChange = (page) => {
    setCurrentPage((prev) => ({
      ...prev,
      [activeTab]: page,
    }));
  };

  const openDetails = (id) => {
    const found = allInvestments.find((i) => i.id === id);
    setSelectedInvestment(found);
    toggleViewDetail(true);
  };

  const openShare = (id) => {
    const found = allInvestments.find((i) => i.id === id);
    setSelectedInvestment(found);
    toggleShareModal(true);
  };

  /* =======================
     RENDER
  ======================== */

  if (loading || overviewLoading) {
    return <GeneralLoader />;
  }

  return (
    <>
      <div className="space-y-8 pt-3 bg-greyBg">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <PagesHeader
            heading="My Investments"
            des="Track and manage your investment portfolio here."
          />
          <Link
            href="/dashboard/packages"
            className="px-5 py-2 bg-formPrimary text-white rounded-lg text-center"
          >
            Invest
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <OverviewStatisticsCard
            heading="Total Invested"
            des={overviewData?.invested_amount ?? 0}
          />
          <OverviewStatisticsCard
            heading="Total Profits"
            des={overviewData?.total_earnings ?? 0}
          />
          <OverviewStatisticsCard
            heading="Active Allocations"
            des={overviewData?.active_investments ?? 0}
          />
          <OverviewStatisticsCard
            heading="Wallet Balance"
            des={overviewData?.total_balance ?? 0}
          />
        </div>

        {/* TABS + SEARCH */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {["all", "active", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-formPrimary text-white"
                    : "bg-white"
                }`}
              >
                {tab === "all"
                  ? "All"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-md">
            <MagnifyingGlass size={18} />
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none"
            />
          </div>
        </div>

        {/* TABLE */}
        {paginatedInvestments.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/Images/empty_state.svg"
                width={40}
                height={40}
                alt="empty"
                className="mx-auto"
              />
              <p>No investments found</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="min-w-full divide-y">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Invested</th>
                  <th>Earned</th>
                  <th>Cap</th>
                  <th>Remaining</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {paginatedInvestments.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.package_name}</td>
                    <td>${inv.invested_amount}</td>
                    <td className="text-green-600">${inv.earned}</td>
                    <td>${inv.roi_cap}</td>
                    <td>${inv.remaining}</td>
                    <td>{inv.status}</td>
                    <td>
                      <InvestmentTableActionDropdown
                        transactionID={inv.id}
                        handleViewDetails={() => openDetails(inv.id)}
                        handleShareDetails={() => openShare(inv.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <button
            disabled={currentPage[activeTab] === 1}
            onClick={() =>
              handlePageChange(currentPage[activeTab] - 1)
            }
          >
            <ArrowLeft />
          </button>

          <span>
            Page {currentPage[activeTab]} of {totalPages}
          </span>

          <button
            disabled={currentPage[activeTab] === totalPages}
            onClick={() =>
              handlePageChange(currentPage[activeTab] + 1)
            }
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      {isViewDetails && (
        <InvestmentDetailsModal
          investment={selectedInvestment}
          onClose={toggleViewDetail}
          handleShareDetails={() => openShare(selectedInvestment.id)}
        />
      )}

      {isShareModal && (
        <InvestmentShareModal
          investment={selectedInvestment}
          onClose={toggleShareModal}
        />
      )}
    </>
  );
};

export default DashboardInvestments;

