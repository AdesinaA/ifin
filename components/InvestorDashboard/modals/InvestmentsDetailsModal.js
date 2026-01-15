"use client";
import React from "react";

const InvestmentDetailsModal = ({
  onClose,
  investment,
  handleShareDetails,
}) => {
  if (!investment) return null;

  const progressPercent =
    investment.roi_cap > 0
      ? Math.min(100, (investment.earned / investment.roi_cap) * 100)
      : 0;

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center justify-center z-50">
      <div
        className="bg-backgroundSecondary px-5 py-10 md:p-10 rounded-xl w-[95%] md:w-[520px]
        max-h-[90vh] overflow-y-auto scrollable-box space-y-7 relative"
      >
        {/* Header */}
        <div className="space-y-3 text-center">
          <h2 className="text-xl font-medium">
            {investment.package_name}
          </h2>
          <p className="text-sm text-grey">
            A snapshot of your investment earnings and progress.
          </p>
        </div>

        {/* Details */}
        <div className="bg-backgroundSecondary rounded-xl p-5 space-y-5">
          <h3 className="text-[#494552] text-sm">Investment details</h3>

          <div className="space-y-3 border-b border-borderColor pb-5 text-sm">
            <DetailRow
              label="Amount invested"
              value={`$${investment.invested_amount}`}
            />

            <DetailRow
              label="Earnings cap"
              value={`$${investment.roi_cap}`}
            />

            <DetailRow
              label="Total earned"
              value={`$${investment.earned}`}
            />

            <DetailRow
              label="Remaining"
              value={`$${investment.remaining}`}
            />

            <DetailRow
              label="Status"
              value={
                investment.status === "active"
                  ? "Earning daily (Mon–Fri)"
                  : "Completed (cap reached)"
              }
              highlight
            />
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <p>Earnings progress</p>
              <p>{progressPercent.toFixed(1)}%</p>
            </div>

            <div className="w-full h-2 bg-[#EFF6FF] rounded-lg">
              <div
                className="h-full bg-formPrimary rounded-lg transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-grey">
              Earnings stop automatically once the cap is reached.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-start gap-3 text-center">
          <button
            type="button"
            className="bg-backgroundSecondary border border-borderColor
            text-label w-1/2 py-3 rounded-lg capitalize"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="bg-formPrimary border border-formPrimary
            text-white w-1/2 py-3 rounded-lg capitalize"
            onClick={handleShareDetails}
          >
            Share progress
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between">
    <span className="text-grey">{label}</span>
    <span
      className={`font-medium ${
        highlight ? "text-formPrimary" : "text-label"
      }`}
    >
      {value}
    </span>
  </div>
);

export default InvestmentDetailsModal;