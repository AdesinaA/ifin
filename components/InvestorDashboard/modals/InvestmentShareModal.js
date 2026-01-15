import { X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { copyToClipboard } from "@/lib/utils";

const InvestmentShareModal = ({ onClose, investment }) => {
  const link = "https://ifinocean.com/investment details/67152";

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div
        className="bg-backgroundSecondary py-10 md:py-5 md:px-0 rounded-xl w-[95%] md:w-[520px] overflow-scroll
       scrollable-box space-y-5 relative"
      >
        {/* Haeder */}
        <div className="flex justify-between items-center pb-3 border-b border-b-borderColor px-5 md:px-7">
          <h2 className="text-sm font-medium">Share Milestone</h2>
          <X size={20} onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="md:px-7 px-5 space-y-5 ">
          <p className="text-xs pb-5">
            I&apos;m excited to share that my investment in the Bronze Growth
            100 package is already 25% complete, and I&apos;m on my way to
            earning 12.5% ROI! Want to start growing your wealth too? 🌟 Join me
            today!
          </p>

          {/* socials */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium">Share to</h3>
            <div className="flex justify-between items-center">
              <button type="button" className="text-center">
                <Image
                  src={`/Images/facebook_logo.svg`}
                  width={40}
                  height={40}
                  alt="facebook logo"
                  className="mx-auto"
                />
                <span className="text-xs">Facebook</span>
              </button>

              <button type="button" className="text-center">
                <Image
                  src={`/Images/whatapp_logo.svg`}
                  width={40}
                  height={40}
                  alt="facebook logo"
                  className="mx-auto"
                />
                <span className="text-xs">Whatsapp</span>
              </button>

              <button type="button" className="text-center">
                <Image
                  src={`/Images/x_logo.svg`}
                  width={40}
                  height={40}
                  alt="facebook logo"
                  className="mx-auto"
                />
                <span className="text-xs">X (Twitter)</span>
              </button>

              <button type="button" className="text-center">
                <Image
                  src={`/Images/linkedln.svg`}
                  width={40}
                  height={40}
                  alt="facebook logo"
                  className="mx-auto"
                />
                <span className="text-xs">Linkedln</span>
              </button>
            </div>
          </div>

          {/* Linkcopy */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium">Copy link</h3>

            <div className="border border-borderColor rounded-lg flex justify-between items-center bg-[#F9F9F9] p-3">
              <p className="text-sm opacity-80">{link}</p>

              <button type="button" onClick={() => copyToClipboard(link)}>
                <Image
                  src={`/Images/copy_icon.svg`}
                  width={15}
                  height={15}
                  alt="Copy Icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentShareModal;
