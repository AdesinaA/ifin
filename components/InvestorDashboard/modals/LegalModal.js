import Link from "next/link";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const LegalModal = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundSecondary md:p-10 px-5 py-10 rounded-xl w-[95%] md:w-[580px] overflow-scroll scrollable-box space-y-10">
        <h2 className="text-center font-medium text-xl">
          Terms of Service & Privacy Policy
        </h2>

        {/* Content */}
        <div className="space-y-5">
          <div className="flex flex-row items-center justify-between gap-5">
            {/* Text content */}
            <div>
              <h3 className="font-medium">Terms of Service</h3>
              <p className="text-faded text-sm md:w-3/4">
                Read the terms governing your use of the platform.
              </p>
            </div>

            {/* CTA */}
            <div>
              <Link
                href={`/terms-of-service`}
                className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer
                 flex gap-2 justify-center items-center"
              >
                View
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5">
            {/* Text content */}
            <div>
              <h3 className="font-medium">Privacy Policy</h3>
              <p className="text-faded text-sm md:w-3/4">
                Understand how your data is collected, used, and protected.
              </p>
            </div>

            {/* CTA */}
            <div>
              <Link
                href={`/privacy-policy`}
                className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer flex 
                gap-2 justify-center items-center"
              >
                View
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="bg-backgroundSecondary border border-borderColor text-label w-full py-2 rounded-lg capitalize cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LegalModal;
