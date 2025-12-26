"use client";
import { useRouter } from "next/navigation";

import useToggle from "@/hooks/UseToggle";

// Icons
import { DotsThreeVertical } from "@phosphor-icons/react/dist/ssr";

const InvestmentTableActionDropdown = ({
  transactionID,
  transactions,
  handleViewDetails,
  handleShareDetails,
}) => {
  const router = useRouter();
  const transaction = transactions.find(
    (transaction) => transaction.package_name === transactionID
  );

  const { isOpen: isDropOpen, toggle: toggleDrop } = useToggle();

  const handleSelectPkg = (pkg) => {
    router.push(`/dashboard/packages/confirm?package=${pkg?.package_id}`);
  };

  return (
    <div
      className="w-8 h-8 rounded-lg border border-borderColor bg-white flex items-center 
      justify-center relative cursor-pointer"
      onClick={toggleDrop}
    >
      <DotsThreeVertical size={20} />

      {isDropOpen && (
        <div className="absolute -bottom-3 right-10 w-36 bg-white border border-borderColor rounded-lg shadow-lg z-10 p-3">
          <ul className="text-left space-y-3">
            <li>
              <button
                type="button"
                onClick={handleViewDetails}
                className="cursor-pointer"
              >
                {" "}
                View details
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${
                  transaction.status === "Active"
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                disabled={transaction.status === "Active"}
                onClick={() => handleSelectPkg(transaction)}
              >
                Reinvest
              </button>
            </li>
            <li>
              <button
                type="button"
                className="cursor-pointer"
                onClick={handleShareDetails}
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
