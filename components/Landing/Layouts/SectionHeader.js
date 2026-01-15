import React from "react";

const SectionHeader = ({ title, header, des }) => {
  return (
    <div className="text-center space-y-3 max-w-3xl mx-auto">
      {/* Small label */}
      {title && (
        <p className="text-xs uppercase tracking-widest text-gold font-medium">
          {title}
        </p>
      )}

      {/* Main heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-navy">
        {header}
      </h2>

      {/* Description */}
      {des && (
        <p className="text-sm sm:text-base text-navyMuted">
          {des}
        </p>
      )}

      {/* Subtle gold accent */}
      <div className="mx-auto w-12 h-[2px] bg-gold rounded-full pt-2" />
    </div>
  );
};

export default SectionHeader;