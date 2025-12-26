import React from "react";

// Icons
import {
  ShieldCheck,
  CurrencyCircleDollar,
  UserSquare,
} from "@phosphor-icons/react/dist/ssr";

const CTA = () => {
  return (
    <div className="mt-16 sm:mt-20 md:mt-36 bg-[#EFF6FF] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16">
        <div className="space-y-10">
          <h2 className="uppercase text-center">
            <span
              className="bg-white text-secondary
             rounded-[4px] py-1 px-3 text-sm sm:text-base border border-secondary"
            >
              Start now
            </span>
          </h2>
          {/* Hero text */}
          <div className="text-center space-y-3">
            {/* Leading */}
            <div className="space-y-1">
              <h2 className="text-4xl font-medium">
                Begin Your Investment Journey Today
              </h2>
            </div>

            <p className="text-lg text-faded">
              Start with any amount of funds and join thousands of successful
              investors.
            </p>
          </div>

          {/* Hero CTA */}
          <div className="space-y-7">
            {/* Buttons */}
            <div className="flex justify-center gap-5 items-center">
              <button
                type="button"
                className="font-medium text-white bg-secondary py-3 px-5 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Start Investing Now
              </button>
            </div>

            {/* attributes */}
            <div className="flex justify-between sm:justify-center items-center gap-1 sm:gap-3">
              <div className="flex gap-2 items-center">
                <ShieldCheck size={20} className="text-secondary" />
                <span className=" text-sm">Secure Investment Platform</span>
              </div>

              <div className="w-[8px] h-[8px] rounded-full bg-[#EFF6FF]"></div>

              <div className="flex gap-2 items-center">
                <CurrencyCircleDollar size={20} className="text-secondary" />
                <span className=" text-sm">Guaranteed Returns</span>
              </div>

              <div className="w-[8px] h-[8px] rounded-full bg-[#EFF6FF]"></div>

              <div className="flex gap-2 items-center">
                <UserSquare size={20} className="text-secondary" />
                <span className=" text-sm">Instant Account Setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
