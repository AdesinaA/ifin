import Image from "next/image";

// Icons
import {
  RocketLaunch,
  TipJar,
  HandArrowDown,
  Package,
  GearSix,
  ShieldCheck,
  ChatTeardropText,
  Headset,
} from "@phosphor-icons/react/dist/ssr";

const DashboardHelpAndSupport = () => {
  const supportCards = [
    {
      icon: <RocketLaunch size={20} className="text-formPrimary" />,
      header: "Getting Started",
      content: "Learn how to set up your account and make your first deposit.",
    },
    {
      icon: <TipJar size={20} className="text-formPrimary" />,
      header: "Deposits",
      content: "Everything you need to know about depositing funds.",
    },
    {
      icon: <HandArrowDown size={20} className="text-formPrimary" />,
      header: "Withdrawal",
      content: "How to withdraw funds and troubleshoot common issues.",
    },
    {
      icon: <Package size={20} className="text-formPrimary" />,
      header: "Investment Packages",
      content: "Explore different investment packages and their benefits.",
    },
    {
      icon: <GearSix size={20} className="text-formPrimary" />,
      header: "Settings",
      content: "Manage your account details, security, and preferences.",
    },
    {
      icon: <ShieldCheck size={20} className="text-formPrimary" />,
      header: "Security",
      content: "Keep your account safe with our security tips and tools.",
    },
    {
      icon: <Headset size={20} className="text-formPrimary" />,
      header: "Live Chat Support",
      content: "Get real-time help from our support team.",
    },
    {
      icon: <ChatTeardropText size={20} className="text-formPrimary" />,
      header: "Contact Us",
      content: "Send us an email or report an issue for detailed assistance.",
    },
  ];
  return (
    <div className={`space-y-10 lg:pb-5 pt-3 scrollable-box  bg-greyBg`}>
      {/* Header */}
      <div className="bg-backgroundPrimary rounded-xl md:py-10 p-5 md:px-8 xl:px-10 2xl:px-16 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-3/5 space-y-5">
          <div className="space-y-1">
            <h2 className="font-bold text-4xl">Help & Support</h2>
            <p>
              We&apos;re here to help! Whether you&apos;re stuck, have a
              question, or just need guidance, you&apos;ll find the support you
              need right here.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="search"
              className="rounded-lg p-2 border border-borderColor w-3/4 truncate outline-none 
              focus:outline-none focus:ring-2 focus:ring-formPrimary "
              name="search"
              id="search"
              placeholder="Search FAQs, guides, or contact support"
            />
            <button
              type="button"
              className="w-1/4 bg-formPrimary text-white text-center py-2 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={`/Images/support_Image.svg`}
            width={175}
            height={160}
            alt="Support Icon"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {/* header */}
        <div>
          <h3 className="text-xl font-medium">Find What You Need</h3>
          <p>
            Explore our organized categories for support articles and FAQs
            tailored to your needs.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {supportCards.map((card, index) => (
            <div
              key={index}
              className="bg-backgroundPrimary rounded-md p-5 space-y-10 col-span-1"
            >
              {card.icon}
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{card.header}</h3>
                <p className="text-sm">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHelpAndSupport;
