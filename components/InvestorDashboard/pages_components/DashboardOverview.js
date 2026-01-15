"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import GeneralLoader from "@/components/GenreralLoader";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import DepositModal from "../modals/DepositModal";

// Hooks
import useToggle from "@/hooks/UseToggle";

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

const DashboardOverview = ({ data }) => {
  const { isOpen: showDepositModal, toggle: toggleDepositModal } = useToggle();
  const firstName = data?.user?.name?.split(" ")[0] || "there";

  return (
    <>
      <section
        className={`space-y-10 pt-6 ${
          showDepositModal ? "h-screen overflow-hidden" : ""
        }`}
      >
        {/* ================= HEADER STRIP ================= */}
        <div className="bg-white border border-navy/10 rounded-xl p-6 flex flex-col gap-4">

          <PagesHeader
            heading="Overview"
            des={`Welcome back, ${firstName}. Here’s a snapshot of your account.`}
          />

          {/* Primary action */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDepositModal}
              className="
                text-sm px-5 py-2 rounded-md font-medium
                border border-navy text-navy
                hover:border-gold hover:text-gold
                transition-colors
              "
            >
              Add funds
            </button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <Suspense fallback={<GeneralLoader />}>
          <DashboardOverviewContent data={data} />
        </Suspense>
      </section>

      {showDepositModal && (
        <DepositModal onClose={toggleDepositModal} data={data} />
      )}
    </>
  );
};

export default DashboardOverview;