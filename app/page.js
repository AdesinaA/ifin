"use client";

// Library imports
import Image from "next/image";
import { useState } from "react";
import { useAudio } from "@/hooks/useAudio";

// Components
import Navigation from "@/components/Landing/Layouts/Navigation";
import SectionHeader from "@/components/Landing/Layouts/SectionHeader";
import Calculator from "@/components/Landing/Sections/Calculator";
import Statistics from "@/components/Landing/Sections/Statistics";
//import Testimonials from "@/components/Landing/Sections/Testimonials";
import Faq from "@/components/Landing/Sections/Faq";
import CTA from "@/components/Landing/Sections/CTA";
import Footer from "@/components/Landing/Sections/Footer";
import WaitlistModal from "@/components/Landing/Modals/WaitlistModal";

// Icons
import {
  ShieldCheck,
  CheckCircle,
  Headset,
} from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalDisplay = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [playing, toggle] = useAudio("/bg_music.mp3");

  const items = [
    {
      title: "How does this Platform work?",
      content: `Users can create an account, choose from a selection of investment packages, deposit funds, and track their earnings. The platform also provides tools to manage transactions, view balances, and withdraw funds seamlessly.`,
    },
    {
      title: "What is the minimum amount I can invest?",
      content:
        "The minimum investment amount depends on the package you choose. For most packages, the starting amount is clearly listed in the package details.",
    },
    {
      title: "Can I invest in multiple packages at the same time?",
      content:
        "Yes, users are allowed to diversify their investments by selecting multiple packages simultaneously.",
    },
    {
      title: "What are the withdrawal Limits?",
      content:
        "Withdrawal limits vary based on your account type and the terms of your investment package. Specific details are listed in the 'Withdraw' section.",
    },
    {
      title: "Is my money safe on this platform?",
      content:
        "Yes, we prioritize your security. We use encryption, two-factor authentication (2FA), and comply with industry standards to protect your funds and personal data.",
    },
    {
      title: "What happens if I lose access to my account?",
      content:
        "If you lose access, contact our support team immediately. You will be required to verify your identity to regain access to your account.",
    },
  ];

  function AttributeItem({ icon, text }) {
    return (
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{text}</span>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          isModalOpen ? "h-screen overflow-hidden" : ""
        } scrollable-box`}
      >
        <button
          onClick={toggle}
          className="fixed bottom-5 right-5 z-50 bg-red-500 text-white p-2 rounded-full"
        >
          {playing ? "Pause Music" : "Play Music"}
        </button>
        <Navigation modalControl={handleModalDisplay} />
        {/* Hero */}

        <div className="lg:min-h-[1016px] bg-secondary">
          <div className="relative z-10 pt-14 lg:pt-28 px-4 space-y-14 lg:space-y-28 xl:space-y-24 2xl:space-y-28">
            {/* Hero content */}
            <div className="space-y-10 pt-20 lg:pt-16">
              {/* Hero text */}
              <div className="text-center space-y-3">
                {/* Leading */}
                <div className="space-y-1">
                  <h2 className="sm:hidden text-2xl font-medium text-white">
                    Secure Your Future With Smart Investments
                  </h2>
                  <h2 className="hidden sm:block text-3xl sm:text-4xl xl:text-5xl font-medium text-white">
                    Secure Your Future With Smart
                  </h2>
                  <h2 className="hidden sm:block text-3xl sm:text-4xl xl:text-5xl font-medium text-white">
                    Investments
                  </h2>
                </div>

                <p className="text-lg text-[#F9FDFD] opacity-90 sm:w-3/5 mx-auto">
                  Skip the complex trading charts and let our expert managed
                  packages deliver consistent returns on your investments
                </p>
              </div>

              {/* Hero CTA */}
              <div className="space-y-7">
                {/* Buttons */}
                <div className="flex justify-center gap-5 items-center">
                  <button
                    type="button"
                    className="font-medium text-secondary bg-white  border border-white rounded-lg py-3 hover:bg-opacity-90 transition-colors w-[190px] md:w-[195px]"
                  >
                    Start Investing Now
                  </button>
                  <button
                    type="button"
                    className="font-medium text-white bg-transparent border border-white py-3 px-5 
                rounded-lg hover:bg-opacity-90 transition-colors w-[190px] md:w-[195px]"
                  >
                    Learn More
                  </button>
                </div>

                {/* attributes */}
                <div className="flex justify-between sm:justify-center text-white items-center gap-1 sm:gap-3">
                  <div className="flex gap-2 items-center">
                    <ShieldCheck size={20} />
                    <span className=" text-sm">256-bit Security</span>
                  </div>

                  <div className="w-[8px] h-[8px] rounded-full bg-[#E3F4F5]"></div>

                  <div className="flex gap-2 items-center">
                    <CheckCircle size={20} />
                    <span className=" text-sm">Licensed & Regulated</span>
                  </div>

                  <div className="w-[8px] h-[8px] rounded-full bg-[#E3F4F5]"></div>

                  <div className="flex gap-2 items-center">
                    <Headset size={20} />
                    <span className=" text-sm">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
          
            <div className="w-full">
              <Image
                src={`/Images/hero-image.svg`}
                width={900}
                height={750}
                alt="Hero Image"
                className="mx-auto rounded-xl"
              />
            </div>
          </div>
        </div>
        {/* <div className="relative w-full overflow-hidden bg-[#00B4BE]">
          
          <Image
            src="/Images/LooperGroup.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={75}
            priority
            className="opacity-10"
          />

          
          <div className="relative z-10 px-4 py-10 space-y-8 max-w-7xl mx-auto">
           
            <div className="text-center space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white">
                Secure Your Future With Smart Investments
              </h1>
              <p className="text-lg text-white opacity-90 max-w-2xl mx-auto">
                Skip the complex trading charts and let our expert managed
                packages deliver consistent returns on your investments
              </p>
            </div>

            
            <div className="space-y-6">
             
              <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                <button
                  type="button"
                  className="font-medium text-[#00B4BE] bg-white border border-white rounded-lg py-3 px-6 hover:bg-opacity-90 transition-colors w-full sm:w-auto"
                >
                  Start Investing Now
                </button>
                <button
                  type="button"
                  className="font-medium text-white bg-transparent border border-white py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors w-full sm:w-auto"
                >
                  Learn More
                </button>
              </div>

             
              <div className="flex flex-wrap justify-center text-white items-center gap-4">
                <AttributeItem
                  icon={<ShieldCheck size={20} />}
                  text="256-bit Security"
                />
                <AttributeItem
                  icon={<CheckCircle size={20} />}
                  text="Licensed & Regulated"
                />
                <AttributeItem
                  icon={<Headset size={20} />}
                  text="24/7 Support"
                />
              </div>
            </div>

           
            <div className="w-full max-w-3xl mx-auto">
              <Image
                src="/Images/hero-image.svg"
                width={900}
                height={750}
                alt="Hero Image"
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </div>
        </div> */}

        {/* Features */}
        <div className="space-y-20 pt-36 w-[90%] mx-auto">
          <SectionHeader
            title={`Key Features`}
            header={`Smart Investing Made Simple`}
            des={`Experience hassle free investments with features designed for your success.`}
          />

          <div className="space-y-5">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
              <div className="min-h-[544px] lg:w-3/5 rounded-3xl bg-greyBg space-y-10 p-6 lg:p-10">
                <div className="space-y-2">
                  <h3 className="font-medium text-2xl lg:text-3xl">
                    Secure Investment Management
                  </h3>
                  <p className="opacity-90">
                    Experience peace of mind with our professionally vetted
                    investment packages, offering guaranteed returns and clear
                    terms for every investment you make.
                  </p>
                </div>

                <div className="relative w-full aspect-[637/300] max-w-[637px] mx-auto">
                  <Image
                    src="/Images/features-1.svg"
                    fill
                    alt="Secure Investment Management"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="min-h-[544px] lg:w-2/5 rounded-3xl bg-greyBg space-y-10 p-6 lg:p-10">
                <div className="space-y-2">
                  <h3 className="font-medium text-2xl lg:text-3xl">
                    Portfolio Management
                  </h3>
                  <p className="opacity-90">
                    Enjoy seamless investment tracking, diversified asset
                    allocation, and tailored strategies to suit your goals.
                  </p>
                </div>

                <div className="relative w-full aspect-[441/314] max-w-[441px] mx-auto">
                  <Image
                    src="/Images/features.svg"
                    fill
                    alt="Portfolio Management"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
              <div className="min-h-[544px] lg:w-2/5 rounded-3xl bg-greyBg space-y-10 p-6 lg:p-10">
                <div className="space-y-2">
                  <h3 className="font-medium text-2xl lg:text-3xl">
                    Easy Withdrawals
                  </h3>
                  <p className="opacity-90">
                    Access your earnings hassle-free with our automated payout
                    system, ensuring you get your returns exactly when promised,
                    every time.
                  </p>
                </div>

                <div className="relative w-full aspect-[441/314] max-w-[441px] mx-auto">
                  <Image
                    src="/Images/Frame-11.svg"
                    fill
                    alt="Easy Withdrawals"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="min-h-[544px] lg:w-3/5 rounded-3xl bg-greyBg space-y-10 p-6 lg:p-10">
                <div className="space-y-2">
                  <h3 className="font-medium text-2xl lg:text-3xl">
                    Expert Support
                  </h3>
                  <p className="opacity-90">
                    Get 24/7 assistance from our dedicated team of investment
                    specialists who are always ready to guide you through your
                    investment journey.
                  </p>
                </div>

                <div className="relative w-full aspect-[637/300] max-w-[637px] mx-auto">
                  <Image
                    src="/Images/features-4.svg"
                    fill
                    alt="Expert Support"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*   Calculator */}
        <div className="space-y-20 pt-36 w-[90%] mx-auto">
          <SectionHeader
            title={`calculator`}
            header={`See Your Money Grow in Real-Time`}
            des={`Calculate your potential returns instantly with our investment simulator no commitment needed`}
          />

          <Calculator />
        </div>
        {/* How it workss */}
        <div className="space-y-20 pt-36 w-[90%] mx-auto">
          <SectionHeader
            title={`How it works`}
            header={`Your Path to Smart Investing`}
            des={`Get started with our simple four-step process that puts you on the road to financial growth`}
          />

          <div className="space-y-20 xl:w-[90%]  xl:mx-auto">
            {/* Content */}
            <div className="flex gap-10 flex-wrap justify-between xl:w-[90%] xl:mx-auto">
              {/* Step 1 and 2 */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Step 1 */}
                <div className="space-y-5 bg-[#EFF6FF] rounded-3xl p-7 2xl:py-14">
                  {/* Image */}
                  <div className="mx-auto w-full relative rounded-3xl h-[300px] 2xl:h-[400px]">
                    <Image
                      src={`/Images/step-1.svg`}
                      fill
                      alt="Step 1: Sign Up"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                  {/* Content */}
                  <div className="bg-[#EFF6FF] rounded-sm space-y-3">
                    {/* Heading */}
                    <h3 className=" text-secondary">Step 1</h3>

                    {/* Body */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-2xl">
                        Create Your Account
                      </h4>

                      <p className="font-geist text-paragraph text-sm">
                        Getting started takes just minutes sign up with your
                        email, create a secure password, and verify your account
                        through our confirmation link.
                      </p>
                    </div>
                  </div>
                </div>

                {/* step 2 */}
                <div className="space-y-5 bg-[#EFF6FF] rounded-3xl p-7 2xl:py-14">
                  {/* Image */}
                  <div className="mx-auto w-full relative rounded-3xl h-[300px] 2xl:h-[400px]">
                    <Image
                      src={`/Images/step-2.svg`}
                      fill
                      alt="Step 2: Fund your account"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                  {/* Content */}
                  <div className="bg-[#EFF6FF] rounded-sm space-y-3">
                    {/* Heading */}
                    <h3 className=" text-secondary">Step 2</h3>

                    {/* Body */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-2xl">
                        Fund Your Account
                      </h4>

                      <p className="font-geist text-paragraph text-sm">
                        Add funds to your investment account using any of our
                        secure payment methods, with instant confirmation of
                        your successful deposit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 and 4 */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Step 3 */}
                <div className="space-y-5 bg-[#EFF6FF] rounded-3xl p-7 2xl:py-14">
                  {/* Images */}
                  <div className="mx-auto w-full relative rounded-3xl h-[300px] 2xl:h-[400px]">
                    <Image
                      src={`/Images/step-3.svg`}
                      fill
                      alt="Step 2: Fund your account"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                  {/* Content */}
                  <div className="bg-[#EFF6FF] rounded-sm space-y-3">
                    {/* Heading */}
                    <h3 className=" text-secondary">Step 3</h3>

                    {/* Body */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-2xl">
                        Choose Your Package
                      </h4>

                      <p className="font-geist text-paragraph text-sm">
                        Browse through our range of investment packages with
                        clear returns, select the one that matches your goals,
                        and start your investment journey.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="space-y-5 bg-[#EFF6FF] rounded-3xl p-7 2xl:py-14">
                  {/* Images */}
                  <div className="mx-auto w-full relative rounded-3xl h-[300px] 2xl:h-[400px]">
                    <Image
                      src={`/Images/step-4.svg`}
                      fill
                      alt="Step 2: Fund your account"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                  {/* Content */}
                  <div className="bg-[#EFF6FF] rounded-sm space-y-3">
                    {/* Heading */}
                    <h3 className=" text-secondary">Step 4</h3>

                    {/* Body */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-2xl">
                        Monitor Your Investment
                      </h4>

                      <p className="font-geist text-paragraph text-sm">
                        Watch your investment grow through our intuitive
                        dashboard while receiving regular updates, and get your
                        returns automatically deposited at maturity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Statistics */}
        <Statistics />
        {/* Faq */}
        <Faq items={items} />
        {/* CTA */}
        <CTA />
        {/* Footer */}
        <Footer />
      </div>

      {isModalOpen && <WaitlistModal onClose={handleModalDisplay} />}
    </>
  );
}
