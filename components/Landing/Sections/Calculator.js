"use client";

// Library imports
import { useState } from "react";

// Icons
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";

const Calculator = () => {
  const [formData, setFormData] = useState({});
  const [showDuration, setShowDuration] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const durationOption = ["1", "2", "3", "4", "5", "6"];
  const durationPlaceHolder = "1 Month";

  const handleDuration = (option) => {
    setFormData((prev) => ({
      ...prev,
      duration: option,
    }));
    setShowDuration(false);
  };

  const investSummary = [
    { title: "Initial investment", value: formData.amount || "—" },
    {
      title: "Duration",
      value: formData.duration
        ? `${formData.duration} months`
        : "—",
    },
    { title: "Estimated returns", value: "—" },
    { title: "Projected cap", value: "—" },
  ];

  return (
    <div className="lg:w-4/5 lg:mx-auto flex flex-col md:flex-row gap-10 justify-between items-start">

      {/* FORM */}
      <form className="w-full md:basis-1/2 space-y-6">

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-navy">
            Investment amount
          </label>

          <div className="border border-navy/20 rounded-lg flex items-center py-2.5 px-3 bg-white">
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              onChange={handleInputChange}
              className="flex-1 outline-none bg-transparent placeholder:text-navyMuted text-navy"
            />

            <span className="text-xs font-medium text-navyMuted">
              USDT
            </span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-navy">
            Investment duration
          </label>

          <div
            className="border border-navy/20 rounded-lg flex justify-between items-center py-2.5 px-3 bg-white relative cursor-pointer"
            onClick={() => setShowDuration(!showDuration)}
          >
            <p
              className={`text-sm ${
                formData.duration ? "text-navy" : "text-navyMuted"
              }`}
            >
              {formData.duration
                ? `${formData.duration} months`
                : durationPlaceHolder}
            </p>

            {showDuration ? (
              <CaretUp size={18} className="text-navyMuted" />
            ) : (
              <CaretDown size={18} className="text-navyMuted" />
            )}

            {showDuration && (
              <div className="absolute top-12 left-0 w-full rounded-lg border border-navy/20 bg-white shadow-md z-50">
                {durationOption.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 text-sm hover:bg-navy/5 cursor-pointer"
                    onClick={() => handleDuration(option)}
                  >
                    {option} months
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* SUMMARY */}
      <div className="w-full md:basis-1/2 space-y-6 bg-navy text-white p-6 rounded-2xl">

        <h3 className="text-sm font-medium text-gold uppercase tracking-wide">
          Investment summary
        </h3>

        <div className="space-y-3">
          {investSummary.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm border-b border-white/10 pb-2"
            >
              <span className="text-white/80">{item.title}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full mt-4 bg-gold text-navy font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          Start investing
        </button>

        <p className="text-xs text-white/70 text-center">
          Estimates are illustrative and subject to package limits.
        </p>
      </div>
    </div>
  );
};

export default Calculator;
