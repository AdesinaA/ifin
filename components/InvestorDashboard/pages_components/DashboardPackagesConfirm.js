"use client";

// Library imports
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// Components & Hookss
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

  const [investmentPackage, setInvestmentPackage] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOverviewData = async () => {
    setOverviewLoading(true);
    const url = `/api/dashboard/overview/general_overview`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setOverviewLoading(false);
        if (response?.data.status === 200) {
          setOverviewData(response?.data?.data);
        } else {
          setOverviewData([]);
        }
      } else {
        setLoading(false);
        setOverviewData([]);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchPackages = async () => {
    setLoading(true);

    const url = `/api/dashboard/get-single-package`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${data?.accessToken}`,
        package_id: packageId,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setLoading(false);
        if (response?.data.status === 200) {
          setInvestmentPackage(response?.data?.data);
        } else {
          setInvestmentPackage([]);
        }
      } else {
        setLoading(false);
        setInvestmentPackage([]);
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchOverviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Caculate maturity date base on InvestmentPkg duration
  function calculateMaturityDate(durationWeeks) {
    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + durationWeeks * 7); // Add weeks in days

    // Format the date
    const formattedMaturityDate = `${maturityDate.getDate()}-${
      maturityDate.getMonth() + 1
    }-${maturityDate.getFullYear()}`;

    return formattedMaturityDate;
  }

  const formattedMaturityDate = calculateMaturityDate(
    investmentPackage?.duration
  );

  //   Go back
  const handleBack = () => {
    router.push(`/dashboard/packages`);
  };

  // Handle Invest
  const [investLoading, setInvestLoading] = useState(false);
  const token = data.accessToken;

  const handleInvest = async () => {
    if (overviewData?.total_balance < investmentPackage?.amount) {
      toggleBalanceInsufficientModal();
      return;
    }

    setInvestLoading(true);

    const url = `/api/dashboard/invest`;
    let data = JSON.stringify({
      packageId: packageId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setInvestLoading(false);
        if (response?.data.status === 201) {
          toggleConfirmationModal();
        } else {
          toggleBalanceInsufficientModal();
          return;
        }
      } else {
        setLoading(false);
        return;
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <>
      <div
        className={`space-y-5 lg:pb-5 pt-3 scrollable-box bg-greyBg ${
          isConfirmationModalOpen || isBalanceInsufficient
            ? "h-[50vh] lg:h-screen overflow-hidden"
            : ""
        }`}
      >
        <h2 className="text-formPrimary text-sm font-medium">
          Dashboard / Packages /{" "}
          <span className="text-black font-normal">Confirm</span>
        </h2>
        {/* Header */}
        <div>
          <PagesHeader
            heading="Confirm Your Investment Package"
            des="Review your selected investment package and payment details to confirm."
          />
        </div>
        {/* Imvesstment details */}
        {loading || overviewLoading ? (
          <GeneralLoader />
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="space-y-1 order-2 md:order-first">
              {/* Header */}
              <div className="bg-white pt-5 pb-3 px-5 rounded-tl-xl rounded-tr-xl">
                <h3>Investment Details</h3>
              </div>

              {/* Actaul Investment details */}
              <div className="bg-white px-5 pt-7 pb-3 space-y-8">
                {/* Package name && Amount */}
                <div className="flex items-start">
                  <div className="w-1/2 font-medium">
                    <h4 className="text-sm  opacity-70">Package Name</h4>
                    <p>{investmentPackage?.package_name}</p>
                  </div>

                  <div className="w-1/2 font-medium">
                    <h4 className="text-sm  opacity-70">Amount</h4>
                    <p>{investmentPackage?.amount}</p>
                  </div>
                </div>

                {/* ROI & Expected Return */}
                <div className="flex items-start">
                  <div className="w-1/2 font-medium">
                    <h4 className="text-sm  opacity-70">ROI</h4>
                    <p>{investmentPackage?.roi}</p>
                  </div>

                  <div className="w-1/2 font-medium">
                    <h4 className="text-sm  opacity-70">Expected Return</h4>
                    <p>{investmentPackage?.package_return}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start">
                  <div className="w-1/2 font-medium">
                    <h4 className="text-sm  opacity-70">Duration</h4>
                    <p>{investmentPackage?.duration} Weeks</p>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-bl-xl rounded-br-xl pt-3 px-5 pb-5 space-y-10">
                <div className="space-y-5">
                  <h4 className="text-sm font-medium opacity-70">
                    Package Method
                  </h4>

                  <div className="flex items-start">
                    <div className="w-1/2 font-medium">
                      <h5 className="text-sm  opacity-70">Using</h5>
                      <p>Wallet Balance</p>
                    </div>

                    <div className="w-1/2 font-medium">
                      <h5 className="text-sm  opacity-70 capitalize">
                        available balance
                      </h5>
                      <p>$ {overviewData.total_balance}</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <p>
                    By clicking &apos;Confirm Investment&apos;, you agree to the
                    terms and conditions.
                  </p>

                  <div className="flex items-start gap-3 text-white text-center">
                    <button
                      type="button"
                      className="bg-buttonInvalid w-1/2 py-3 rounded-lg capitalize cursor-pointer"
                      onClick={handleBack}
                    >
                      Go back
                    </button>
                    <button
                      type="button"
                      className="bg-formPrimary w-1/2 py-3 rounded-lg capitalize cursor-pointer"
                      onClick={handleInvest}
                    >
                      {investLoading
                        ? "Confirming investment..."
                        : " Confirm Investment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="space-y-1">
              {/* Header */}
              <div className="bg-white pt-5 pb-3 px-5 rounded-tl-xl rounded-tr-xl">
                <h3>Terms and Conditions</h3>
              </div>

              {/* Text content */}

              <div className="p-5 bg-white rounded-bl-xl rounded-br-xl">
                <p className="text-sm leading-relaxed tracking-wide opacity-90">
                  By proceeding with this investment, you agree to our Terms and
                  Conditions. The minimum and maximum investment amounts are
                  defined by your selected package, and returns on investment
                  (ROI) are based on outlined estimates but are not guaranteed
                  beyond specified terms. Investments are locked during the
                  incubation period and cannot be canceled or withdrawn until
                  maturity. <br />
                  <br />
                  Returns will be credited to your wallet after the investment
                  duration ends, and funds can be withdrawn at any time after
                  crediting. Payments must be made using the available balance
                  in your wallet, and discrepancies in payment must be reported
                  within 24 hours. <br /> <br />
                  Please note that investments involve financial risks, and
                  while we strive to minimize them, we are not liable for losses
                  due to market fluctuations or unforeseen circumstances. Ensure
                  that all information provided is accurate, and secure your
                  account and wallet credentials.
                  <br /> <br />
                  We reserve the right to modify investment packages, policies,
                  or terms as necessary, with prior notice of significant
                  changes. By clicking Confirm Investment, you acknowledge that
                  you have read, understood, and agreed to these Terms and
                  Conditions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isConfirmationModalOpen && (
        <InvestmentConfirmationModal
          onClose={toggleConfirmationModal}
          pkg={investmentPackage}
          maturityDate={formattedMaturityDate}
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
