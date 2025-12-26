import React from "react";

const SectionHeader = ({ title, header, des }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      {/* Header title */}
      <h2 className="uppercase">
        <span className="bg-[#EFF6FF] border border-primary rounded-[4px] py-1 px-3">
          {title}
        </span>
      </h2>

      <div className="space-y-3 text-center">
        <span className="text-4xl font-medium">{header}</span>
        <p className="text-faded">{des}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
