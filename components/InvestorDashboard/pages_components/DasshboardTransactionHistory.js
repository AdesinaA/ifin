"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import useToggle from "@/hooks/UseToggle";
import TransactionViewModal from "../modals/TransactionViewModal";
import TransactionTable from "../tables/TransactionTable";
import GeneralLoader from "@/components/GenreralLoader";

const DashboardTransactionHistory = ({ data }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const token = data?.accessToken;

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/dashboard/transaction_history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (
        response.status === 200 &&
        response?.data?.data?.message !== "No transactions found"
      ) {
        setTransactions(response.data.data.transactions);
      } else {
        setTransactions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const { isOpen: isModalOpen, toggle: toggleModal } = useToggle();
  const [selectedTx, setSelectedTx] = useState(null);

  const handleToggle = (id) => {
    if (!id) {
      setSelectedTx(null);
      toggleModal();
      return;
    }

    const tx = transactions.find((t) => t._id === id);
    setSelectedTx(tx);
    toggleModal();
  };

  return (
    <>
      {isLoading ? (
        <GeneralLoader />
      ) : (
        <div
          className={`space-y-6 pt-3 bg-greyBg ${
            isModalOpen ? "h-[50vh] lg:h-screen overflow-hidden" : ""
          }`}
        >
          <PagesHeader
            heading="Activity"
            des="A record of actions and account events."
          />

          {transactions.length === 0 ? (
            <div className="bg-backgroundPrimary rounded-xl p-10 text-center">
              <Image
                src="/Images/empty_state.svg"
                alt="empty"
                width={36}
                height={36}
                className="mx-auto mb-2 opacity-60"
              />
              <p className="text-sm text-grey">
                No activity recorded yet.
              </p>
            </div>
          ) : (
            <TransactionTable
              transactions={transactions}
              handleDetailsToggle={handleToggle}
              transactionspage
            />
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

export default DashboardTransactionHistory;
