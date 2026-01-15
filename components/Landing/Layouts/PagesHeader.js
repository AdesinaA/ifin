import React from "react";

const PagesHeader = ({ heading, des }) => {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl md:text-xl font-semibold text-navy">
        {heading}
      </h2>

      <p className="text-sm text-navyMuted max-w-2xl">
        {des}
      </p>

      {/* subtle divider */}
      <div className="w-10 h-[2px] bg-gold rounded-full mt-2" />
    </div>
  );
};

export default PagesHeader;
