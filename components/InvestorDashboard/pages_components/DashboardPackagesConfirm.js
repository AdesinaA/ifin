"use client";

// Library imports
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Components & Hooks
import useToggle from "@/hooks/UseToggle";
import GeneralLoader from "@/components/GenreralLoader";
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import InvestmentConfirmationModal from "../modals/InvestmentConfirmationModal";
import BalanceInsufficientModal from "../modals/BalanceInsufficientModal";

const DashboardPackagesConfirm = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");

  const { isOpen: isConfirmationModalOpen, toggle: toggleConfirmationModal } =
    useToggle();
  const {
    isOpen: isBalanceInsufficient,
    toggle: toggleBalanceInsufficientModal,
  } = useToggle();

  const [plan, setPlan] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [overviewLoading, setOverviewLoading] = useState(false);

  const token = data.accessToken;

  const fetchOverviewData = async () => {
    setOverviewLoading(true);
    try {
      const response = await axios.get(
        `/api/dashboard/overview/general_overview`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response?.data?.status === 200) {
        setOverviewData(response.data.data);
      }
    } finally {
      setOverviewLoading(false);
    }
  };

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/dashboard/get-single-package`, {
        headers: {
          Authorization: `Bearer ${token}`,
          package_id: packageId,
        },
      });

      if (response.status === 200 && response?.data?.status === 200) {
        setPlan(response.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
    fetchOverviewData();
  }, []);

  const calculateMaturityDate = (weeks) => {
    const date = new Date();
    date.setDate(date.getDate() + weeks * 7);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleBack = () => {
    router.push(`/dashboard/packages`);
  };

  const [actionLoading, setActionLoading] = useState(false);


  const handleAllocate = async () => {
    if (!plan || actionLoading) return;

    setActionLoading(true);

    try {
      const response = await axios.post(
        `/api/dashboard/invest`,
        { packageId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response?.data?.status === 201) {
        toggleConfirmationModal();
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toggleBalanceInsufficientModal();
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || overviewLoading) return <GeneralLoader />;
  return (
    <>
      <div className="space-y-8 pt-3 bg-greyBg">
        <PagesHeader
          heading="Review plan allocation"
          des="Review the details below before allocating funds to this plan."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Plan details */}
          <div className="bg-backgroundPrimary rounded-xl p-6 space-y-6">
            <h3 className="font-medium text-lg">Plan details</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-grey">Plan</span>
                <span className="font-medium">{plan?.package_name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Allocation</span>
                <span className="font-medium">{plan?.amount} USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Lock period</span>
                <span className="font-medium">{plan?.duration} weeks</span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Estimated outcome</span>
                <span className="font-medium">
                  {plan?.package_return} USDT
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Maturity date</span>
                <span className="font-medium">
                  {calculateMaturityDate(plan?.duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Allocation summary */}
          <div className="bg-backgroundPrimary rounded-xl p-6 space-y-6">
            <h3 className="font-medium text-lg">Allocation summary</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-grey">Source</span>
                <span className="font-medium">Wallet balance</span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Available balance</span>
                <span className="font-medium">
                  {overviewData?.total_balance} USDT
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-xs text-grey">
                By continuing, you confirm that you understand the lock period
                and allocation terms.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="w-1/2 py-2 text-sm border rounded-md hover:bg-greyBg"
                >
                  Back to Plans
                </button>

                <button
                  onClick={handleAllocate}
                  className="w-1/2 py-2 text-sm bg-formPrimary text-gold rounded-md"
                >
                  {actionLoading ? "Allocating..." : "Allocate funds"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isConfirmationModalOpen && (
        <InvestmentConfirmationModal
          onClose={toggleConfirmationModal}
          pkg={plan}
          maturityDate={calculateMaturityDate(plan?.duration)}
          handleBack={handleBack}
        />
      )}

      {isBalanceInsufficient && (
        <BalanceInsufficientModal onClose={toggleBalanceInsufficientModal} />
      )}
    </>
  );
};

export default DashboardPackagesConfirm;