"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import useToggle from "@/hooks/UseToggle";
import TransactionViewModal from "../modals/TransactionViewModal";
import TransactionTable from "../tables/TransactionTable";
import Calendar from "../others/Calendar";
import GeneralLoader from "@/components/GenreralLoader";

// Icons
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";

const DasshboardTransactionHistory = ({ data }) => {
  const [transactions, setTransactions] = useState([]);

  const [isTransactionLoading, setTransactionLoading] = useState(false);
  const token = data?.accessToken;

  const fetchRecentTransactions = async () => {
    setTransactionLoading(true);
    const url = `/api/dashboard/transaction_history`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setTransactionLoading(false);
        if (response?.data?.data?.message !== "No transactions found") {
          setTransactions(response?.data?.data?.transactions);
        } else {
          setTransactionLoading(false);
          setTransactions([]);
        }
      } else {
        setTransactionLoading(false);
        setTransactions([]);
      }

      // return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const { isOpen: isModalOpen, toggle: toggleModal } = useToggle();

  const [selectedTx, setSelectedTx] = useState(null);

  const handleToggle = (id) => {
    if (id === null) {
      setSelectedTx(null);
      toggleModal();
      return;
    }

    const selectedTransaction = transactions.find((tx) => tx._id === id);
    setSelectedTx(selectedTransaction);
    toggleModal();
  };

  const [transactionTypeFilter, setTransactionTypeFilter] = useState("All");
  const { isOpen: isTypeFilterOpen, toggle: toggleTypeFilter } = useToggle();
  const handleTypeFilter = (filter) => {
    if (filter) {
      setTransactionTypeFilter(filter);
    }

    toggleTypeFilter();
  };

  const [statusTypeFilter, setStatusTypeFilter] = useState("All");
  const { isOpen: isStatusFilterOpen, toggle: toggleStatusFilter } =
    useToggle();
  const handleStatusFilter = (filter) => {
    if (filter) {
      setStatusTypeFilter(filter);
    }

    toggleTypeFilter();
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearch = () => {
    if (fromDate && toDate) {
      onSearch({ fromDate, toDate });
    }
  };

  const handleDateChange = (type, value) => {
    if (type === "from") {
      setFromDate(value);
      // If to date is before from date, reset to date
      if (toDate && new Date(value) > new Date(toDate)) {
        setToDate("");
      }
    } else {
      setToDate(value);
    }
  };

  return (
    <>
      {isTransactionLoading ? (
        <GeneralLoader />
      ) : (
        <div
          className={`space-y-5 lg:pb-5 pt-3 scrollable-box  ${
            isModalOpen ? "h-[50vh] lg:h-screen overflow-hidden" : ""
          } bg-greyBg relative ${
            transactions?.length === 0 && "md:h-[50vh] h-[80vh]"
          }`}
        >
          {/* Header */}
          <div>
            <PagesHeader
              heading="Transaction History"
              des="View and track all your transaction activities, including deposits, withdrawals, and investments."
            />
          </div>

          {/* Filters */}
          {/* <div className="md:flex gap-5 md:items-end grid grid-cols-2 grid-flow-row">
          <div className="space-y-1 text-xs col-span-1">
            <h3>Type</h3>
            <div
              className="flex justify-between items-center min-w-[160px] p-2 rounded-lg border
               border-borderColor relative cursor-pointer"
              onClick={toggleTypeFilter}
            >
              <p className="capitalize">{transactionTypeFilter}</p>
              {isTypeFilterOpen ? (
                <CaretUp size={15} />
              ) : (
                <CaretDown size={15} />
              )}

              {isTypeFilterOpen && (
                <div className="absolute w-full bg-white rounded-lg top-10 p-3 left-0 z-50 shadow-2xl">
                  <ul className="space-y-2 text-sm">
                    <li
                      onClick={() => handleTypeFilter("all")}
                      className="cursor-pointer hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      All
                    </li>
                    <li
                      onClick={() => handleTypeFilter("deposit")}
                      className="cursor-pointer hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      Deposit
                    </li>
                    <li
                      onClick={() => handleTypeFilter("withdrawal")}
                      className="cursor-pointer hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      Withdrawal
                    </li>
                    <li
                      onClick={() => handleTypeFilter("investment")}
                      className="cursor-pointer hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      Investment
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 text-xs col-span-1">
            <h3>Status</h3>
            <div
              className="flex justify-between items-center min-w-[160px] p-2 rounded-lg border
               border-borderColor relative cursor-pointer"
              onClick={toggleStatusFilter}
            >
              <p className="capitalize">{statusTypeFilter}</p>
              {isStatusFilterOpen ? (
                <CaretUp size={15} />
              ) : (
                <CaretDown size={15} />
              )}

              {isStatusFilterOpen && (
                <div className="absolute w-full bg-white rounded-lg top-10 p-3 left-0 z-50 shadow-2xl">
                  <ul className="space-y-2 text-sm">
                    <li
                      onClick={() => handleStatusFilter("all")}
                      className="cursor-pointer hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      All
                    </li>
                    <li
                      onClick={() => handleStatusFilter("successful")}
                      className="cursor-pointer capitalize hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      Successful
                    </li>
                    <li
                      onClick={() => handleStatusFilter("pending")}
                      className="cursor-pointer capitalize hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      pending
                    </li>
                    <li
                      onClick={() => handleStatusFilter("failed")}
                      className="cursor-pointer capitalize hover:bg-formPrimary hover:text-white hover:p-1 hover:rounded-md transition-all duration-500"
                    >
                      failed
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="relative text-xs space-y-1 col-span-2">
            <h3>Date</h3>
            <div className="flex items-center gap-4 w-full">
              <div className="flex justify-between md:justify-normal items-center gap-2 rounded-lg shadow-sm p-2 border border-borderColor w-full">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => handleDateChange("from", e.target.value)}
                  placeholder="From"
                  className="w-24 outline-none cursor-pointer bg-transparent"
                />
                <span className="">-</span>
                <input
                  type="date"
                  value={toDate}
                  min={fromDate} // Prevent selecting date before fromDate
                  onChange={(e) => handleDateChange("to", e.target.value)}
                  placeholder="To"
                  className="w-24 outline-none cursor-pointer bg-transparent"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="border border-formPrimary text-formPrimary py-1 px-5 rounded-md col-span-2"
          >
            Search
          </button>
        </div> */}

          {/* Transaction */}

          {transactions?.length === 0 ? (
            <div className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
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
          ) : (
            <div>
              <TransactionTable
                transactions={transactions}
                handleDetailsToggle={handleToggle}
                transactionspage={true}
              />
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <TransactionViewModal
          selectedTx={selectedTx}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default DasshboardTransactionHistory;
