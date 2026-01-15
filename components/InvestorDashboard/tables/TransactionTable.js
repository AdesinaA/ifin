"use client";

import { useState } from "react";
import Link from "next/link";
import { truncateString } from "@/lib/utils";

// Icons
import {
  Copy,
  LinkSimple,
} from "@phosphor-icons/react";

export default function TransactionTable({
  transactions,
  handleDetailsToggle,
  transactionspage,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = transactions.slice(startIndex, startIndex + itemsPerPage);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* silent */
    }
  };

  const TruncatedCell = ({ value, type, txId }) => (
    <div
      className="relative flex items-center gap-2 text-sm text-navy"
      onMouseEnter={() => setHoveredItem({ type, id: txId })}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <span className="font-mono">
        {truncateString(value, 4, 4)}
      </span>

      <LinkSimple size={14} className="opacity-40" />

      <button
        onClick={() => copyToClipboard(value)}
        className="opacity-40 hover:opacity-80"
      >
        <Copy size={14} />
      </button>

      {hoveredItem?.type === type && hoveredItem?.id === txId && (
        <div className="absolute z-20 -top-14 left-0 bg-white border border-navy/10 rounded-md px-3 py-2 shadow-md text-xs w-[260px] break-words text-navy">
          {value}
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white rounded-2xl border border-navy/10 overflow-hidden">

      {/* Header */}
      {!transactionspage && (
        <div className="flex justify-between items-center px-6 py-4 border-b border-navy/10">
          <div>
            <p className="text-xs uppercase tracking-wide text-gold">
              Activity
            </p>
            <h3 className="text-sm font-medium text-navy">
              Recent transactions
            </h3>
          </div>

          <Link
            href="/dashboard/transaction_history"
            className="text-xs font-medium text-navyMuted hover:text-navy"
          >
            View all
          </Link>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FAFAFA] border-b border-navy/10">
            <tr className="text-xs uppercase tracking-wide text-navyMuted">
              <th className="py-3 px-5 text-left font-medium">Date</th>
              <th className="py-3 px-5 text-left font-medium">Type</th>
              <th className="py-3 px-5 text-left font-medium">Amount</th>
              <th className="py-3 px-5 text-left font-medium">Wallet</th>
              <th className="py-3 px-5 text-left font-medium">Reference</th>
              <th className="py-3 px-5 text-left font-medium">Status</th>
              <th className="py-3 px-5" />
            </tr>
          </thead>

          <tbody className="divide-y divide-navy/5">
            {paginated.map((tx) => (
              <tr
                key={tx._id}
                className="hover:bg-[#FBFBFB] transition-colors"
              >
                <td className="py-4 px-5 text-navyMuted">
                  {tx.createdAt}
                </td>

                <td className="py-4 px-5 capitalize text-navy">
                  {tx.type}
                </td>

                <td className="py-4 px-5 font-medium text-navy">
                  {tx.quantity}
                </td>

                <td className="py-4 px-5">
                  <TruncatedCell
                    value={tx.wallet}
                    type="address"
                    txId={tx._id}
                  />
                </td>

                <td className="py-4 px-5">
                  <TruncatedCell
                    value={tx._id}
                    type="reference"
                    txId={tx._id}
                  />
                </td>

                <td className="py-4 px-5 capitalize">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full
                      ${
                        tx.status === "confirmed"
                          ? "bg-green-50 text-green-700"
                          : tx.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                  >
                    {tx.status}
                  </span>
                </td>

                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => handleDetailsToggle(tx._id)}
                    className="text-xs font-medium text-gold hover:underline"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {transactionspage && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-navy/10 text-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-navyMuted disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-navyMuted">
            Page <strong>{currentPage}</strong> of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="text-navyMuted disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}