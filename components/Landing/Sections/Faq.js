"use client";

// Library imports
import { useState } from "react";

// Components
import AccordionItem from "../Cards/AccordionItem";

const Faq = ({ items }) => {
  const [openItems, setOpenItems] = useState(items.map(() => false));

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      const next = [...prev];
      next.fill(false);
      next[index] = !prev[index];
      return next;
    });
  };

  return (
    <section className="pt-32 w-[90%] mx-auto max-w-6xl space-y-16">
      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* Header */}
        <div className="space-y-4 lg:w-[30%]">
          <span className="inline-block text-xs uppercase tracking-wide font-semibold 
            bg-gold text-navy px-3 py-1 rounded-full">
            FAQ
          </span>

          <h2 className="text-3xl font-semibold text-navy">
            Common questions
          </h2>

          <p className="text-sm text-navyMuted">
            Clear answers to how the platform works, how earnings are calculated,
            and how investments are completed.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 lg:w-[70%]">
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
    </section>
  );
};

export default Faq;
