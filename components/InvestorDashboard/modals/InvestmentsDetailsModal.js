import React from "react";
import Image from "next/image";

const InvestmentDetailsModal = ({
  onClose,
  investment,
  handleShareDetails,
}) => {
  const calculateProgress = () => {
    const start = new Date(investment.start_date);
    const end = new Date(investment.end_date);
    const today = new Date();

    const totalDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const daysElapsed =
      (today.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const daysLeft = Math.max(0, Math.ceil(totalDays - daysElapsed));

    const percentageCompleted = Math.min(
      100,
      Math.max(0, Math.floor((daysElapsed / totalDays) * 100))
    );

    return { daysLeft, percentageCompleted };
  };

  const { daysLeft, percentageCompleted } = calculateProgress();

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div
        className="bg-white px-5 py-10 md:p-10 rounded-xl w-[95%] md:w-[520px]  overflow-scroll
       scrollable-box space-y-7 relative"
      >
        {/* Haeder */}
        <div className="space-y-7">
          {/* <Image
            src={`/Images/bronze.svg`}
            width={150}
            height={130}
            alt="Celebration Icon"
            className="mx-auto block"
          /> */}

          {/* Haeder text content */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">{investment.package_name}</h2>
            <p className="text-sm">
              A snapshot of your ongoing investment and its progress.
            </p>
          </div>
        </div>

        {/* Payment summary */}
        <div className="bg-backgroundSecondary rounded-xl p-5 space-y-5 ">
          <h3 className="text-[#494552] text-sm">Details section:</h3>

          {/* Details */}
          <div className="space-y-3 border-b border-b-borderColor pb-5">
            {/* Package name */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Investment Package</h4>
              <p className="font-medium">{investment?.package_name}</p>
            </div>

            {/* Amount invested */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Invested Amount </h4>
              <p className="font-medium">${investment?.amount}</p>
            </div>

            {/* Expected return */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Expected ROI</h4>
              <p className="font-medium">{investment?.roi}</p>
            </div>

            {/* ROI */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Projected Returns</h4>
              <p className="font-medium">{investment?.returns}</p>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Investment Duration</h4>
              <p className="font-medium">{investment?.duration}</p>
            </div>

            {/* Start Date */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Start Date</h4>
              <p className="font-medium">
                {new Date(investment.start_date).toLocaleDateString()}
              </p>
            </div>

            {/* End Date */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Maturity Date</h4>
              <p className="font-medium">
                {new Date(investment.end_date).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-sm">
              <h4 className="text-grey">Status</h4>
              <p className="font-medium">
                <span
                  className={`inline-flex items-center gap-1.5 ${
                    investment.status === "Active"
                      ? "text-blue"
                      : "text-formPrimary"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`${
                        investment.status === "Active" ? "animate-ping" : ""
                      } absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        investment.status === "Active"
                          ? "bg-green-600"
                          : "bg-formPrimary"
                      } capitalize`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        investment.status === "Active"
                          ? "bg-green-600"
                          : "bg-formPrimary"
                      } capitalize`}
                    />
                  </span>
                  {investment.status}
                </span>
              </p>
            </div>
          </div>

          {/* Milestone */}
          <div className="space-y-2">
            {/* header */}
            <div className="flex justify-between items-center text-xs">
              <p>Invested: ${investment?.amount}</p>
              <p>Target: {investment?.package_return}</p>
            </div>

            {/* Progress */}
            <div className="w-full h-[4px] bg-[#EFF6FF] rounded-lg">
              <div
                className="h-full bg-formPrimary rounded-lg"
                style={{ width: `${percentageCompleted}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <p className="text-blue">{percentageCompleted}% Completed</p>
              <p className="text-grey">{daysLeft} days left until maturity</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-start gap-3 text-white text-center">
          <button
            type="button"
            className="bg-backgroundSecondary border border-borderColor text-black w-1/2 py-3 rounded-lg capitalize cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-formPrimary border border-formPrimary w-1/2 py-3 rounded-lg capitalize cursor-pointer"
            onClick={handleShareDetails}
          >
            Share Milestones
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetailsModal;
