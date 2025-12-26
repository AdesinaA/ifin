"use client";

import { useState } from "react";
import Link from "next/link";
import { truncateString } from "@/lib/utils";

// Icons
import {
  ArrowUpRight,
  Copy,
  LinkSimple,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react";

export default function TransactionTable({
  transactions,
  handleDetailsToggle,
  transactionspage,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const TruncatedCell = ({ value, type, txId }) => (
    <div className="flex items-center gap-2 relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setHoveredItem({ type, id: txId })}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {truncateString(value, 4, 4)}
        <LinkSimple size={17} />
        <button
          onClick={() => copyToClipboard(value)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Copy size={17} className="rounded-lg" />
        </button>
      </div>

      {hoveredItem?.type === type && hoveredItem?.id === txId && (
        <div
          className="absolute z-10 -top-12 left-0 bg-[#F9F9F9] rounded-lg px-3 py-2 
        shadow-lg text-sm w-[226px] h-auto break-words" // Removed whitespace-nowrap
        >
          <p> {value}</p>
        </div>
      )}
    </div>
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = transactions?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full space-y-5 bg-white rounded-md py-5">
      {!transactionspage && (
        <div className="flex justify-between items-center px-5">
          <h2 className="text-sm font-medium">Recent Transactions</h2>
          <Link
            href={`/dashboard/transactions`}
            className="text-xs text-formPrimary flex items-center gap-1"
          >
            View More
            <ArrowUpRight size={15} />
          </Link>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-xs border-b">
              <th className="py-3 px-4 font-medium">Date & Time</th>
              <th className="py-3 px-4 font-medium">Tx Type</th>
              <th className="py-3 px-4 font-medium">Qty</th>
              <th className="py-3 px-4 font-medium">Address</th>
              <th className="py-3 px-4 font-medium">Txid</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPackages?.map((tx, index) => (
              <tr
                key={index}
                className="border-b border-b-borderColor hover:bg-gray-50 text-sm text-[#615C6E]"
              >
                <td className="py-3 px-4">{tx.createdAt}</td>
                <td className="py-3 px-4 capitalize">{tx.type}</td>
                <td className="py-3 px-4">{tx.quantity}</td>
                <td className="py-3 px-4">
                  <TruncatedCell
                    value={tx.wallet}
                    type="address"
                    txId={tx._id}
                  />
                </td>
                <td className="py-3 px-4">
                  <TruncatedCell value={tx._id} type="txid" txId={tx._id} />
                </td>
                <td className="py-3 px-4 capitalize">
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      tx.status === "confirmed"
                        ? "text-blue"
                        : "text-red-600"
                    } capitalize`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          tx.status === "confirmed"
                            ? "bg-blue"
                            : "bg-red-600"
                        } `}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          tx.status === "confirmed"
                            ? "bg-blue"
                            : "bg-red-600"
                        } capitalize`}
                      />
                    </span>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-blue hover:text-blue"
                    onClick={() => handleDetailsToggle(tx._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactionspage && (
        <div className="flex items-center justify-between gap-2 px-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white
                 hover:bg-gray-50 disabled:opacity-50 disabled:text-grey disabled:cursor-not-allowed text-sm"
          >
            <ArrowLeft size={15} />
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 rounded-md ${
                  currentPage === page
                    ? "bg-[#E3F4F5] text-[#EFF6FF] font-medium text-sm p-2 rounded-lg flex items-center justify-center"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white
                 disabled:text-grey text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
