"use client";

import { useState } from "react";

// Icons
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

export default function RefferalsTable({ refferals }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(refferals?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = refferals?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function extractDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="w-full space-y-5 bg-white rounded-md py-5">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-xs border-b">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Date registered</th>
              <th className="py-3 px-4 font-medium">Total earnings ($)</th>
              {/* <th className="py-3 px-4 font-medium">Txid</th> */}
            </tr>
          </thead>

          <tbody>
            {paginatedPackages?.map((refferal, index) => (
              <tr
                key={index}
                className="border-b border-b-borderColor hover:bg-gray-50 text-sm text-[#615C6E]"
              >
                <td className="py-3 px-4">{refferal.name}</td>
                <td className="py-3 px-4">{refferal.email}</td>
                <td className="py-3 px-4">{extractDate(refferal.createdAt)}</td>

                <td className="py-3 px-4">{refferal.totalEarnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}
