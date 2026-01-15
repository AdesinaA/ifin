"use client";

import Image from "next/image";
import { useState } from "react";
import { useAudio } from "@/hooks/useAudio";

import Navigation from "@/components/Landing/Layouts/Navigation";
import SectionHeader from "@/components/Landing/Layouts/SectionHeader";
import Calculator from "@/components/Landing/Sections/Calculator";
import Statistics from "@/components/Landing/Sections/Statistics";
import Faq from "@/components/Landing/Sections/Faq";
import CTA from "@/components/Landing/Sections/CTA";
import Footer from "@/components/Landing/Sections/Footer";
import WaitlistModal from "@/components/Landing/Modals/WaitlistModal";

import {
  ShieldCheck,
  CheckCircle,
  Headset,
} from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playing, toggle] = useAudio("/bg_music.mp3");

  const items = [
    {
      title: "How does this platform work?",
      content:
        "You select an investment package, earn fixed daily ROI on weekdays, and track every transaction transparently until the earning cap is reached.",
    },
    {
      title: "Is ROI guaranteed?",
      content:
        "ROI rules are predefined by system logic. Earnings accrue automatically based on package rules and stop once limits are reached.",
    },
    {
      title: "Are referral earnings capped?",
      content:
        "Yes. Referral earnings contribute toward the same earning limits as investments to prevent uncontrolled payouts.",
    },
    {
      title: "Can I withdraw anytime?",
      content:
        "Withdrawals are available for wallet balances that have been fully credited and confirmed by the system.",
    },
  ];

  return (
    <>
      <div className={isModalOpen ? "h-screen overflow-hidden" : ""}>
        {/* Music toggle (dev only) */}
        <button
          onClick={toggle}
          className="fixed bottom-5 right-5 z-50 bg-gold text-navy px-4 py-2 rounded-full text-sm"
        >
          {playing ? "Pause Music" : "Play Music"}
        </button>

        <Navigation modalControl={() => setIsModalOpen(!isModalOpen)} />

        {/* ================= HERO ================= */}
        <section className="bg-navy text-textInverse">
          <div className="max-w-6xl mx-auto px-4 pt-32 pb-28 space-y-16">
            <div className="text-center space-y-6">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-medium">
                A structured investment platform 
                <br className="hidden sm:block" />
                built on clear earning rules
              </h1>

              <p className="max-w-3xl mx-auto text-base sm:text-lg text-textInverse/80">
                Invest with predictable logic. Earn fixed weekday ROI.
                Track every credit, limit, and completion transparently.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button className="bg-gold text-navy font-medium px-6 py-3 rounded-lg hover:opacity-90">
                Explore the platform
              </button>

              <button className="border border-gold text-gold px-6 py-3 rounded-lg hover:bg-gold hover:text-navy transition">
                How it works
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 bg-navySoft border border-borderColor/20 rounded-xl p-6 text-sm">
              <div>
                <p className="font-medium text-gold">Daily ROI</p>
                <p className="text-textInverse/70">Accrues Monday to Friday</p>
              </div>
              <div>
                <p className="font-medium text-gold">Earning caps</p>
                <p className="text-textInverse/70">Fixed per package</p>
              </div>
              <div>
                <p className="font-medium text-gold">Ledger-first</p>
                <p className="text-textInverse/70">Fully auditable earnings</p>
              </div>
            </div>
          </div>
        </section>

{/* ================= PRINCIPLES ================= */}
<section className="pt-32 w-[90%] mx-auto space-y-16">

  <SectionHeader
    title="Platform design"
    header="Built around predictability"
    des="Every earning follows predefined logic — no hidden mechanics."
  />

  <div className="grid md:grid-cols-3 gap-6">
    {[
      ["Fixed earning caps", "Investments stop earning automatically once limits are reached."],
      ["Weekday accrual", "ROI is credited only on active weekdays."],
      ["Referral-aware limits", "Referral income respects the same caps."],
      ["Automated payouts", "No manual approvals or delays."],
      ["Wallet-first architecture", "Balances reflect confirmed funds only."],
      ["Transparent lifecycle", "Start, progress, and completion are always visible."],
    ].map(([title, desc]) => (
      <div
        key={title}
        className="
          relative
          bg-white
          rounded-xl
          p-6
          space-y-4
          border
          border-gold/40
          hover:border-gold
          transition-all
        "
      >
        {/* Gold vertical accent */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-gold rounded-full" />

        <h3 className="font-semibold text-lg text-navy pl-3">
          {title}
        </h3>

        <p className="text-sm text-navyMuted pl-3">
          {desc}
        </p>
      </div>
    ))}
  </div>

</section>


        {/* ================= CALCULATOR ================= */}
        <section className="pt-36 w-[90%] mx-auto space-y-12">
          <SectionHeader
            title="Return projection"
            header="Estimate potential returns"
            des="Based strictly on package rules and weekday ROI logic."
          />
          <Calculator />
          <p className="text-xs text-textMuted text-center max-w-2xl mx-auto">
            Projections are estimates only. Actual returns depend on system rules and earning limits.
          </p>
        </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="pt-32 w-[90%] mx-auto space-y-20">

          <SectionHeader
            title="How it works"
            header="A clear investment lifecycle"
            des="Every step follows predefined system rules — no hidden mechanics."
          />

          <div className="max-w-5xl mx-auto space-y-10">

            {[
              [
                "Step 1",
                "Create your account",
                "Register with your email and gain access to the dashboard where all wallets, investments, and earnings are managed."
              ],
              [
                "Step 2",
                "Fund your wallet",
                "Add funds to your wallet. Your balance remains fully visible and usable — nothing is auto-locked."
              ],
              [
                "Step 3",
                "Select an investment package",
                "Each package has defined ROI, duration, and a maximum earning cap enforced by the system."
              ],
              [
                "Step 4",
                "Earn until completion",
                "ROI and referral earnings accrue automatically until the cap is reached, then the investment closes."
              ],
            ].map(([step, title, desc]) => (
              <div
                key={step}
                className="
                  relative
                  bg-white
                  rounded-xl
                  p-6
                  space-y-3
                  border
                  border-gold/40
                "
              >
              
                <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-gold rounded-full" />

                <span className="text-sm font-semibold text-gold pl-3">
                  {step}
                </span>

                <h3 className="text-xl font-semibold text-navy pl-3">
                  {title}
                </h3>

                <p className="text-sm text-navyMuted pl-3">
                  {desc}
                </p>
              </div>
            ))}

          </div>
          </section>

{/* ================= TRUST & TRANSPARENCY ================= */}
<section className="pt-32 w-[90%] mx-auto space-y-20">

  <SectionHeader
    title="Trust & transparency"
    header="Built on rules, not promises"
    des="All earnings, referrals, and payouts follow auditable system logic."
  />

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      ["Capped earnings", "Each investment stops earning once its predefined cap is reached."],
      ["Automated ROI logic", "ROI is calculated and credited automatically on active weekdays only."],
      ["Transparent transaction logs", "Every earning and withdrawal is recorded and visible in your dashboard."],
      ["Referral system with limits", "Referral rewards follow generation rules and respect earning caps."],
      ["Wallet-first accounting", "Funds move through wallets — balances reflect confirmed transactions only."],
      ["No hidden mechanics", "No surprise fees, no manual overrides, no undisclosed conditions."],
    ].map(([title, desc]) => (
      <div
        key={title}
        className="
          relative
          bg-white
          rounded-xl
          p-6
          space-y-3
          border
          border-gold/40
          hover:border-gold
          transition-all
        "
      >
        {/* Gold accent */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-gold rounded-full" />

        <h3 className="font-semibold text-lg text-navy pl-3">
          {title}
        </h3>

        <p className="text-sm text-navyMuted pl-3">
          {desc}
        </p>
      </div>
    ))}
  </div>

</section>

        <Statistics />
        <Faq items={items} />
        <CTA />
        <Footer />
      </div>

      {isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
