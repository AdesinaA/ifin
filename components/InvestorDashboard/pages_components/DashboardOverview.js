"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import GeneralLoader from "@/components/GenreralLoader";

// Component
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import DepositModal from "../modals/DepositModal";

const DashboardOverviewContent = dynamic(
  () =>
    import("../sections/overview_page/OverviewContent").then(
      (mod) => mod.default
    ),
  {
    loading: () => <GeneralLoader />,
    ssr: false,
  }
);

// Hooks
import useToggle from "@/hooks/UseToggle";

// Icons
import { Plus } from "@phosphor-icons/react/dist/ssr";

const DashboardOverview = ({ data }) => {
  const { isOpen: showDepositModal, toggle: toggleDepositModal } = useToggle();
  const first_name = data?.user.name.split(" ")[1];

  return (
    <>
      <div
        className={`${
          showDepositModal ? "h-[50vh] lg:h-screen overflow-hidden" : ""
        } space-y-10 md:space-y-5 lg:pb-5 pt-3 bg-greyBg`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
          <div>
            <PagesHeader
              heading={`Welcome back, ${first_name}!`}
              des="Here's an overview of your portfolio today."
            />
          </div>

          <div>
            <button
              type="button"
              className="py-2 px-5 bg-formPrimary text-white 
            hover:bg-opacity-75 flex gap-2 rounded-lg items-center"
              onClick={toggleDepositModal}
            >
              <Plus size={15} />
              Deposit funds
            </button>
          </div>
        </div>

        <Suspense fallback={<GeneralLoader />}>
          <DashboardOverviewContent data={data} />
        </Suspense>
      </div>

      {showDepositModal && (
        <DepositModal onClose={toggleDepositModal} data={data} />
      )}
    </>
  );
};

export default DashboardOverview;
