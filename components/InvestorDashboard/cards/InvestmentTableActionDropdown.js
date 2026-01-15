"use client";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/UseToggle";
import { DotsThreeVertical } from "@phosphor-icons/react/dist/ssr";

const InvestmentTableActionDropdown = ({
  transactionID,
  handleViewDetails,
  handleShareDetails,
}) => {
  const { isOpen: isDropOpen, toggle: toggleDrop } = useToggle();

  return (
    <div
      className="w-8 h-8 rounded-lg border border-borderColor bg-backgroundSecondary 
      flex items-center justify-center relative cursor-pointer"
      onClick={toggleDrop}
    >
      <DotsThreeVertical size={20} />

      {isDropOpen && (
        <div className="absolute -bottom-3 right-10 w-36 bg-backgroundSecondary 
        border border-borderColor rounded-lg shadow-lg z-10 p-3">
          <ul className="text-left space-y-3 text-sm">
            <li>
              <button
                type="button"
                onClick={() => handleViewDetails(transactionID)}
                className="cursor-pointer hover:text-formPrimary"
              >
                View details
              </button>
            </li>

            <li className="opacity-50 cursor-not-allowed text-faded">
              Reinvest (Complete investment first)
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleShareDetails(transactionID)}
                className="cursor-pointer hover:text-formPrimary"
              >
                Share Milestones
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InvestmentTableActionDropdown;