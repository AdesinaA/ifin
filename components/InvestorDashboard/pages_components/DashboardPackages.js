"use client";

// Library imports
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import GeneralLoader from "@/components/GenreralLoader";

// Icons
import { MagnifyingGlass, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const DashboardPackages = ({ data }) => {
  const [investmentPackages, setInvestmentPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);

    const url = `/api/dashboard/get-packages`;

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
        setLoading(false);
        if (response?.data.status === 200) {
          setInvestmentPackages(response?.data?.data);
        } else {
          setInvestmentPackages([]);
        }
      } else {
        setLoading(false);
        setInvestmentPackages([]);
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState({
    all: 1,
    bronze: 1,
    silver: 1,
    gold: 1,
  });
  const itemsPerPage = 7;

  const filteredPackages =
    investmentPackages?.length === 0
      ? []
      : investmentPackages?.filter((pkg) => {
          const matchesSearch =
            pkg.package_name.toLowerCase().includes(search.toLowerCase()) ||
            pkg.amount.toString().includes(search) ||
            pkg.package_return.toString().includes(search.toLowerCase()) ||
            pkg.roi.toString().includes(search.toLowerCase()) ||
            pkg.duration.toString().includes(search.toLowerCase());

          if (activeTab === "all") return matchesSearch;
          return pkg.tier.toLowerCase() === activeTab && matchesSearch;
        });

  const totalPages = Math.ceil(filteredPackages?.length / itemsPerPage);
  const startIndex = (currentPage[activeTab] - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [activeTab]: page,
    }));
  };

  const handleSelectPkg = (pkg) => {
    router.push(`/dashboard/packages/confirm?package=${pkg?._id}`);
  };

  const [onSearchFocus, setSearchFocus] = useState(false);

  return (
    <div className={`space-y-5 lg:pb-5 pt-3 scrollable-box bg-greyBg`}>
      {/* Header */}
      <div>
        <PagesHeader
          heading="Choose Your Investment Package"
          des="Invest confidently with transparent ROI and flexible options tailored to your goals."
        />
      </div>

      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <div className="flex justify-end items-center text-sm">
              {/* Tabs */}
              {/* <div className="flex space-x-1 p-1 rounded-lg">
                {["all", "bronze", "silver", "gold"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-2 rounded-md ${
                      activeTab === tab
                        ? "bg-[#E3F4F5] text-[#00383E] font-medium"
                        : "hover:bg-gray-200 text-[#98A2B3]"
                    }`}
                  >
                    {tab === "all"
                      ? "All Packages"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div> */}

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

            {loading ? (
              <GeneralLoader />
            ) : (
              <div className="mt-6">
                <div className="bg-greyBg rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Tier
                        </th>
                        <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Package Name
                        </th>
                        <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Amount (USDT)
                        </th>
                        <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Return (USDT)
                        </th>
                        <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          ROI (%)
                        </th>

                        <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Duration (Weeks)
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm text-[#615C6E]">
                      {paginatedPackages?.map((pkg, index) => (
                        <tr key={index}>
                          {activeTab === "all" && (
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              Tier {pkg.tier}
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {pkg.package_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {pkg.amount}
                            <span className="text-[9px] uppercase"> usdt</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {pkg.package_return}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {pkg.roi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {pkg.duration}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              className="bg-formPrimary text-white px-4 py-2 rounded-md"
                              onClick={() => handleSelectPkg(pkg)}
                            >
                              Invest
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between gap-2 py-4">
                  <button
                    onClick={() => handlePageChange(currentPage[activeTab] - 1)}
                    disabled={currentPage[activeTab] === 1}
                    className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white
                 hover:bg-gray-50 disabled:opacity-50 disabled:text-grey disabled:cursor-not-allowed text-sm"
                  >
                    <ArrowLeft size={15} />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
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
                      )
                    )}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage[activeTab] + 1)}
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
  );
};

export default DashboardPackages;
