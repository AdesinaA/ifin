"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

export default function RefferalsTable({ refferals }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(refferals?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = refferals?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left text-grey">
            <th className="py-3 px-4 font-medium">Name</th>
            <th className="py-3 px-4 font-medium">Email</th>
            <th className="py-3 px-4 font-medium">Joined</th>
            <th className="py-3 px-4 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {paginated?.map((user, index) => (
            <tr
              key={index}
              className="border-b hover:bg-greyBg text-[#344054]"
            >
              <td className="py-3 px-4 font-medium">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{formatDate(user.createdAt)}</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center rounded-full bg-[#ECFDF3] px-2 py-1 text-xs font-medium text-[#027A48]">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm
            hover:bg-greyBg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={14} />
          Previous
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`h-8 w-8 rounded-md text-sm ${
                currentPage === page
                  ? "bg-[#F2F4F7] font-medium"
                  : "hover:bg-greyBg"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm
            hover:bg-greyBg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
