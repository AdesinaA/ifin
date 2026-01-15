import React from "react";

// Icons
import {
  ShieldCheck,
  CurrencyCircleDollar,
  UserSquare,
} from "@phosphor-icons/react/dist/ssr";

const CTA = () => {
  return (
    <section className="mt-20 md:mt-36 bg-navy py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10">

        {/* Label */}
        <span className="inline-block text-xs uppercase tracking-wide font-semibold 
          bg-gold text-navy px-4 py-1 rounded-full">
          Get started
        </span>

        {/* Headline */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Begin your investment journey today
          </h2>

          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Choose a package, earn within defined limits, and track every return
            transparently from your dashboard.
          </p>
        </div>

        {/* Primary CTA */}
        <div>
          <button
            type="button"
            className="bg-gold text-navy font-semibold px-8 py-4 rounded-xl 
            hover:opacity-90 transition text-sm md:text-base"
          >
            Start investing now
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm pt-6">

          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-gold" />
            <span>Secure platform</span>
          </div>

          <div className="w-[6px] h-[6px] rounded-full bg-gold/60 hidden sm:block" />

          <div className="flex items-center gap-2">
            <CurrencyCircleDollar size={20} className="text-gold" />
            <span>Defined earning rules</span>
          </div>

          <div className="w-[6px] h-[6px] rounded-full bg-gold/60 hidden sm:block" />

          <div className="flex items-center gap-2">
            <UserSquare size={20} className="text-gold" />
            <span>Instant account access</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
