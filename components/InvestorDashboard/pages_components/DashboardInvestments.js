"use client";

// Library imports
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Components && Hooks
import useToggle from "@/hooks/UseToggle";
import GeneralLoader from "@/components/GenreralLoader";
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import OverviewStatisticsCard from "../cards/OverviewStatisticsCard";
import InvestmentTableActionDropdown from "../cards/InvestmentTableActionDropdown";
import InvestmentDetailsModal from "../modals/InvestmentsDetailsModal";
import InvestmentShareModal from "../modals/InvestmentShareModal";

// Icons
import { MagnifyingGlass, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const DashboardInvestments = ({ data }) => {
  const [overviewData, setOverviewData] = useState([]);

  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overviewLoading, setOverviewLoading] = useState(false);

  const fetchOverviewData = async () => {
    setOverviewLoading(true);
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
        setOverviewLoading(false);
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
      throw error;
    }
  };

  const fetchInvestmentData = async () => {
    setLoading(true);
    const url = `/api/dashboard/investments`;

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
          setInvestments(response?.data?.data?.investments);
        } else {
          setInvestments([]);
        }
      } else {
        setLoading(false);
        setInvestments([]);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOverviewData();
    fetchInvestmentData();
  }, []);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState({
    all: 1,
    active: 1,
    completed: 1,
  });
  const itemsPerPage = 5;

  const filteredPackages = investments?.filter((pkg) => {
    const matchesSearch =
      pkg.package_name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.amount.toString().includes(search) ||
      pkg.roi.toLowerCase().includes(search.toLowerCase()) ||
      pkg.start_date.toLowerCase().includes(search.toLowerCase()) ||
      pkg.end_date.toLowerCase().includes(search.toLowerCase()) ||
      pkg.status.toLowerCase().includes(search.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && pkg.status === "active";
    if (activeTab === "completed")
      return matchesSearch && pkg.status === "Completed";
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage[activeTab] - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [activeTab]: page,
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [onSearchFocus, setSearchFocus] = useState(false);

  const [selectedTx, setSelectedTx] = useState(null);

  const { isOpen: isViewDetails, toggle: toggleViewDetail } = useToggle();
  const { isOpen: isShareModal, toggle: toggleShareModal } = useToggle();

  const handleViewDetails = (investment_packageName) => {
    const investment = investments.find(
      (investment) => investment.package_name === investment_packageName
    );
    setSelectedTx(investment);
    toggleViewDetail(true);
    toggleShareModal(false);
  };

  const handleShareDetails = (investment_packageName) => {
    const investment = investments.find(
      (investment) => investment.package_name === investment_packageName
    );
    setSelectedTx(investment);
    toggleViewDetail(false);
    toggleShareModal(true);
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      {loading || overviewLoading ? (
        <GeneralLoader />
      ) : (
        <div
          className={`space-y-8 lg:pb-5 pt-3 scrollable-box bg-greyBg ${
            isViewDetails || isShareModal
              ? "h-[50vh] lg:h-screen overflow-hidden"
              : ""
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <PagesHeader
                heading="My Investments"
                des="Track and manage your investment portfolio here."
              />
            </div>

            <Link
              href={`/dashboard/packages`}
              className="py-2 px-5 bg-formPrimary text-white 
            hover:bg-opacity-75 rounded-lg md:w-[181px] w-full text-center"
            >
              Invest
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <OverviewStatisticsCard
              heading="Total Amount Invested"
              des={overviewData?.invested_amount || 0}
              stat={`+11%`}
              noBorder={true}
            >
              <p>usdt</p>
            </OverviewStatisticsCard>

            <OverviewStatisticsCard
              heading="Total ROI Earned"
              des={overviewData?.total_earnings || 0}
              stat={`+13%`}
              invest={true}
            >
              <p>usdt</p>
            </OverviewStatisticsCard>

            <OverviewStatisticsCard
              heading="Active Investment"
              des={overviewData?.active_investments || 0}
              invest={true}
            />
            <OverviewStatisticsCard
              heading="Wallet Balance"
              des={overviewData?.total_balance || 0}
              invest={true}
            >
              {" "}
              <p>usdt</p>
            </OverviewStatisticsCard>
          </div>

          <div className="w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="w-full">
                <div className="flex justify-between items-center text-sm">
                  {/* Tabs */}
                  <div className="flex space-x-1 p-1 rounded-lg">
                    {["all", "active", "completed"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 py-2 rounded-md ${
                          activeTab === tab
                            ? "bg-[#EFF6FF] text-[#EFF6FF] font-medium"
                            : "hover:bg-gray-200 text-[#98A2B3]"
                        }`}
                      >
                        {tab === "all"
                          ? "All Investments"
                          : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div
                    className={`md:flex hidden items-center gap-2 p-3 bg-white rounded-lg basis-2/5 2xl:2/5 ${
                      onSearchFocus ? "border border-formPrimary" : ""
                    }`}
                  >
                    <MagnifyingGlass size={20} className="text-grey" />
                    <input
                      type="search"
                      className="bg-transparent outline-none border-none w-full "
                      name="search"
                      id="search"
                      placeholder="Search here..."
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                    />
                  </div>
                </div>

                {paginatedPackages?.length === 0 && (
                  <div className="relative h-[400px]">
                    {paginatedPackages?.length === 0 && (
                      <div
                        className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 
                    -translate-y-1/2 flex justify-center items-center"
                      >
                        <div className="text-center space-y-2">
                          <Image
                            src="/Images/empty_state.svg"
                            alt="empty"
                            width={40}
                            height={40}
                            className="mx-auto"
                          />
                          <p>No activity yet</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {paginatedPackages?.length !== 0 && (
                  <div className="mt-6">
                    <div className="bg-greyBg rounded-lg overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                          <tr>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Package Name
                            </th>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              ROI
                            </th>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Start Date
                            </th>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              End Date
                            </th>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm text-[#615C6E]">
                          {paginatedPackages.map((pkg, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {pkg.package_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {pkg.amount}{" "}
                                <span className="text-[9px] uppercase">
                                  {" "}
                                  usdt
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {pkg.roi}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(pkg.start_date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(pkg.end_date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-1.5 ${
                                    pkg.status === "Active"
                                      ? "text-blue"
                                      : "text-formPrimary"
                                  } capitalize`}
                                >
                                  <span className="relative flex h-2 w-2">
                                    <span
                                      className={`${
                                        pkg.status === "Active"
                                          ? "animate-ping"
                                          : ""
                                      } absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                        pkg.status === "Active"
                                          ? "bg-blue"
                                          : "bg-formPrimary"
                                      }`}
                                    />
                                    <span
                                      className={`relative inline-flex rounded-full h-2 w-2 ${
                                        pkg.status === "Active"
                                          ? "bg-blue"
                                          : "bg-formPrimary"
                                      }`}
                                    />
                                  </span>
                                  {pkg.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <InvestmentTableActionDropdown
                                  transactionID={pkg.package_name}
                                  transactions={investments}
                                  handleViewDetails={() =>
                                    handleViewDetails(pkg.package_name)
                                  }
                                  handleShareDetails={() =>
                                    handleShareDetails(pkg.package_name)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between gap-2 py-4">
                      <button
                        onClick={() =>
                          handlePageChange(currentPage[activeTab] - 1)
                        }
                        disabled={currentPage[activeTab] === 1}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white
                 hover:bg-gray-50 disabled:opacity-50 disabled:text-grey disabled:cursor-not-allowed text-sm"
                      >
                        <ArrowLeft size={15} />
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`h-8 w-8 rounded-md ${
                              currentPage[activeTab] === page
                                ? "bg-[#E3F4F5] text-[#1D4ED8] font-medium text-sm p-2 rounded-lg flex items-center justify-center"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          handlePageChange(currentPage[activeTab] + 1)
                        }
                        disabled={currentPage[activeTab] === totalPages}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white
                 disabled:text-grey text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isViewDetails && (
        <InvestmentDetailsModal
          onClose={toggleViewDetail}
          investment={selectedTx}
          handleShareDetails={() => handleShareDetails()}
        />
      )}

      {isShareModal && (
        <InvestmentShareModal
          onClose={toggleShareModal}
          investment={selectedTx}
        />
      )}
    </>
  );
};

export default DashboardInvestments;
