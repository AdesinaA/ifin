"use client";

// Library imports
import { useState } from "react";

// Components
import AccordionItem from "../Cards/AccordionItem";

const Faq = ({ items }) => {
  const [openItems, setOpenItems] = useState(items.map((item) => false));

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => {
      const newOpenItems = [...prevOpenItems];

      if (newOpenItems[index]) {
        newOpenItems[index] = false;
      } else {
        newOpenItems.fill(false);
        newOpenItems[index] = true;
      }

      return newOpenItems;
    });

    // setSelectedToken(items[index]);
  };
  return (
    <div className="space-y-20 pt-36 w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between gap-10 items-start ">
        {/* Header */}
        <div className="space-y-3 sm:space-y-5 basis-[30%]">
          {/* Header title */}
          <h2 className="uppercase">
            <span className="bg-[#EFF6FF] border border-primary rounded-[4px] py-1 px-3">
              FAQ
            </span>
          </h2>

          <div className="space-y-2 sm:space-y-3">
            <span className="text-4xl font-medium">
              Common Questions Answered
            </span>
            <p className="text-sm sm:text-base md:text-lg">
              Find quick answers to your questions about investing with us
            </p>
          </div>
        </div>

        <div className="space-y-3 w-full xl:w-[70%] mx-auto">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isActive={openItems[index]}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
