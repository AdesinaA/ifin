"use client";

// Library imports
import { use, useState } from "react";

// Icons
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";

const Calculator = () => {
  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const durationOption = ["1", "2", "3", "4", "5", "6"];
  const durationPlaceHolder = "1 Month";
  const [showDuration, setShowDuration] = useState(false);
  const handleShowDuration = () => {
    setShowDuration(!showDuration);
  };
  const handleDuration = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      duration: option,
    }));
    setShowDuration(false);
  };

  const investSummary = [
    {
      title: "Initial Investment",
      value: formData.amount,
    },
    {
      title: "Duration",
      value: formData.duration + " Months",
    },
    {
      title: "Expected Returns",
      value: `$0.1`,
    },
    {
      title: "Profit",
      value: "$ 0.00",
    },
  ];

  return (
    <div className="lg:w-4/5 lg:mx-auto flex flex-col md:flex-row gap-10 justify-between items-start">
      <form className="w-full lg:basis-1/3 md:basis-1/2 space-y-5">
        <div className="space-y-2">
          <label htmlFor="amount">Investment Amount</label>
          <div className="border border-borderColor rounded-lg flex items-center py-2 px-3">
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="0.00"
              onChange={handleInputChange}
              className="basis-[90%] transparent border-none outline-none placeholder:text-faded"
            />

            <div className="flex gap-1 items-center">
              <div className="w-5 h-5 rounded-full bg-[url('/Images/USA.svg')] bg-center bg-cover bg-no-repeat"></div>
              <p className="text-sm text-faded">USD</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="amount">Investment Duration</label>
          <div
            className="border border-borderColor rounded-lg flex justify-between items-center py-2 px-3 relative"
            onClick={handleShowDuration}
          >
            <p
              className={`basis-[90%] transparent border-none ${
                formData.duration ? "" : "text-faded"
              } `}
            >
              {formData.duration
                ? `${formData.duration} Month`
                : durationPlaceHolder}
            </p>

            {showDuration ? (
              <CaretUp size={20} className="text-faded" />
            ) : (
              <CaretDown size={20} className="text-faded" />
            )}

            {showDuration && (
              <div
                className="absolute top-12 left-0 w-full max-h-[300px] overflow-scroll rounded-lg border
             border-borderColor space-y-3 py-3 scrollable-box z-50 bg-white"
              >
                {durationOption.map((option, index) => (
                  <div
                    key={index}
                    className="hover:bg-primary transition-all duration-500 cursor-pointer py-2 px-3"
                    onClick={() => handleDuration(option)}
                  >
                    <p className="text-sm">{option} Months</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="w-full lg:basis-1/2 md:basis-1/2 space-y-5 bg-greyBg p-5 rounded-xl">
        <h3 className="capitalize text-sm font-medium">
          Your investment Summary
        </h3>

        <div className="space-y-3">
          {investSummary.map((item, index) => (
            <div
              key={index}
              className="text-faded flex justify-between items-center"
            >
              <p>{item.title}:</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="font-medium w-full text-center text-white bg-secondary py-3 px-5 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start Investing Now
        </button>
      </div>
    </div>
  );
};

export default Calculator;
