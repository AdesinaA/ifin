"use client";

// Library import
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  SquaresFour,
  HandDeposit,
  Package,
  HandArrowDown,
  Scroll,
  GearSix,
  Question,
  SignOut,
  Eye,
  EyeSlash,
  MagnifyingGlass,
  UsersThree,
  CaretUp,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const SideNavbar = ({ showSider, toggleSidebar, signOut }) => {
  const pathname = usePathname();
  const navigateToOverviwe = () => {
    window.location.href = "/dashboard";
  };

  const navigateToDeposit = () => {
    window.location.href = "/dashboard/deposit";
  };

  const navigateToWithdrawal = () => {
    window.location.href = "/dashboard/withdrawal";
  };

  const navigateToHistory = () => {
    window.location.href = "/dashboard/transaction_history";
  };

  const navigateToSetting = () => {
    window.location.href = "/dashboard/settings";
  };

  const navigateToHelp = () => {
    window.location.href = "/dashboard/help_and_support";
  };

  const navigateToPackages = () => {
    window.location.href = "/dashboard/packages";
  };

  const navigateToInvestments = () => {
    window.location.href = "/dashboard/investments";
  };

  const navigateToRefferal = () => {
    window.location.href = "/dashboard/refferals";
  };

  const NavItems = [
    {
      name: "Overview",
      icon: <SquaresFour size={20} />,
      link: "/dashboard",
      onClick: navigateToOverviwe,
    },
    {
      name: "Deposit",
      icon: <HandDeposit size={20} />,
      link: "/dashboard/deposit",
      onClick: navigateToDeposit,
    },
  ];

  const OtherNavItems = [
    {
      name: "Withdraw",
      icon: <HandArrowDown size={20} />,
      link: "/dashboard/withdrawal",
      onClick: navigateToWithdrawal,
    },
    {
      name: "Refferals",
      icon: <UsersThree size={20} />,
      link: "/dashboard/refferals",
      onClick: navigateToRefferal,
    },
    {
      name: "Transaction History",
      icon: <Scroll size={20} />,
      link: "/dashboard/transaction_history",
      onClick: navigateToHistory,
    },
  ];

  const PreferencesItems = [
    {
      name: "Settings",
      icon: <GearSix size={20} />,
      link: "/dashboard/settings",
      onClick: navigateToSetting,
    },
    {
      name: "Help & Support",
      icon: <Question size={20} />,
      link: "/dashboard/help_and_support",
      onClick: navigateToHelp,
    },
  ];

  const [showInvestmentDropdown, setShowInvestmentDropdown] = useState(false);
  const handleShowInvestmentDropdown = () => {
    setShowInvestmentDropdown(!showInvestmentDropdown);
  };

  return (
    <nav className="bg-white text-primary w-full p-5 h-screen flex-shrink-0 shadow-sm relative space-y-10">
      {/* Logo and Brand Name */}
      <Link href={`/dashboard`} className="flex items-center gap-1">
        <Image
          src={`/Images/BillionBe_Logo.svg`}
          width={40}
          height={40}
          alt="IfinOcean Logo"
        />
        <h1 className="lg:text-xl xl:text-2xl font-medium text-black">
          IfinOcean
        </h1>
      </Link>

      {/* Nav item */}
      <div className="space-y-5">
        <h2 className="px-2 text-sm text-[#83899F]">Home</h2>
        <ul className="text-black space-y-5">
          {NavItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center gap-2 px-2 lg:text-xs xl:text-sm font-medium ${
                  pathname === item.link
                    ? "bg-formPrimary text-white rounded-md py-3 lg:py-2 xl:py-3 "
                    : ""
                }`}
                onClick={item.onClick}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}

          {/* Investments and Packages */}
          <li
            className={`${
              pathname === `/dashboard/packages/confirm` ||
              pathname === `/dashboard/packages` ||
              pathname === `/dashboard/investments` ||
              (showInvestmentDropdown &&
                "bg-[#F9F9F9] rounded-md px-3 py-3 lg:py-2 xl:py-3 ")
            } space-y-5 cursor-pointer`}
            onClick={handleShowInvestmentDropdown}
          >
            <span className={`flex items-center justify-between px-2`}>
              <span
                className={`flex items-center gap-2 lg:text-xs xl:text-sm font-medium `}
              >
                <Package size={20} />
                Investment
              </span>

              {showInvestmentDropdown ? (
                <CaretUp size={20} />
              ) : (
                <CaretDown size={20} />
              )}
            </span>

            {showInvestmentDropdown && (
              <span className="px-3 block space-y-3 border-l-2 border-l-formPrimary">
                <span>
                  <button
                    type="button"
                    className={`w-full flex items-center gap-2 px-2 py-3 lg:py-2 xl:py-3  lg:text-xs xl:text-sm font-medium ${
                      pathname === `/dashboard/packages/confirm`
                        ? "bg-formPrimary text-white rounded-md "
                        : ""
                    }  ${
                      pathname === `/dashboard/packages`
                        ? "bg-formPrimary text-white rounded-md "
                        : ""
                    }`}
                    onClick={navigateToPackages}
                  >
                    Packages
                  </button>
                </span>

                <span>
                  <button
                    className={`w-full flex items-center gap-2 px-2 py-3 lg:py-2 xl:py-3  lg:text-xs xl:text-sm font-medium ${
                      pathname === `/dashboard/investments`
                        ? "bg-formPrimary text-white rounded-md "
                        : ""
                    }`}
                    onClick={navigateToInvestments}
                  >
                    Investments
                  </button>
                </span>
              </span>
            )}
          </li>

          {OtherNavItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center gap-2 px-2 lg:text-xs xl:text-sm font-medium ${
                  pathname === item.link
                    ? "bg-formPrimary text-white rounded-md py-3 lg:py-2 xl:py-3 "
                    : ""
                }`}
                onClick={item.onClick}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* <ul className="text-black space-y-5 hidden md:block">
          {NavItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`w-full flex items-center gap-2 px-2 lg:text-xs xl:text-sm font-medium ${
                  pathname === item.link
                    ? "bg-formPrimary text-white rounded-md py-3 lg:py-2 xl:py-3 "
                    : ""
                }`}
                onClick={toggleSidebar}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          
          <li
            className={`${
              pathname === `/dashboard/packages/confirm` ||
              pathname === `/dashboard/packages` ||
              pathname === `/dashboard/investments` ||
              (showInvestmentDropdown &&
                "bg-[#F9F9F9] rounded-md px-3 py-3 lg:py-2 xl:py-3 ")
            } space-y-5 cursor-pointer`}
            onClick={handleShowInvestmentDropdown}
          >
            <span className={`flex items-center justify-between px-2`}>
              <span
                className={`flex items-center gap-2 lg:text-xs xl:text-sm font-medium `}
              >
                <Package size={20} />
                Investment
              </span>

              {showInvestmentDropdown ? (
                <CaretUp size={20} />
              ) : (
                <CaretDown size={20} />
              )}
            </span>

            {showInvestmentDropdown && (
              <span className="px-3 block space-y-3 border-l-2 border-l-formPrimary">
                <span>
                  <Link
                    href={`/dashboard/packages`}
                    className={`w-full flex items-center gap-2 px-2 py-3 lg:py-2 xl:py-3  lg:text-xs xl:text-sm font-medium ${
                      pathname === `/dashboard/packages/confirm`
                        ? "bg-formPrimary text-white rounded-md "
                        : ""
                    }  ${
                      pathname === `/dashboard/packages`
                        ? "bg-formPrimary text-white rounded-md "
                        : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    Packages
                  </Link>
                </span>

                <span>
                  <Link
                    href={`/dashboard/investments`}
                    className={`w-full flex items-center gap-2 px-2 py-3 lg:py-2 xl:py-3  lg:text-xs xl:text-sm font-medium ${
                      pathname === `/dashboard/investments`
                        ? "bg-formPrimary text-white rounded-md "
                        : ""
                    }`}
                    onClick={navigateToInvestments}
                  >
                    Investments
                  </Link>
                </span>
              </span>
            )}
          </li>

          {OtherNavItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`w-full flex items-center gap-2 px-2 lg:text-xs xl:text-sm font-medium ${
                  pathname === item.link
                    ? "bg-formPrimary text-white rounded-md py-3 lg:py-2 xl:py-3 "
                    : ""
                }`}
                onClick={toggleSidebar}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>

      {/* {!showInvestmentDropdown && (
        <div className="flex md:hidden items-center gap-2 p-3 bg-[#F7F9FC] rounded-md">
          <MagnifyingGlass size={20} className="text-faded" />
          <input
            type="search"
            className="bg-transparent outline-none border-none w-full"
            name="search"
            id="search"
            placeholder="Search here..."
          />
        </div>
      )} */}

      {/* Nav footer */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        {/* Line */}
        <div className="w-full h-[1px] bg-[#ced4da] px-5 mb-3"></div>

        {/* Preferences */}
        <div className="space-y-4 relative">
          <h2 className="px-2 text-sm text-[#83899F]">Preferences</h2>
          <div className="space-y-5">
            <ul className="text-black space-y-5">
              {PreferencesItems.map((item, index) => (
                <li key={index}>
                  <button
                    className={`w-full flex items-center gap-2 px-2 text-sm font-medium ${
                      pathname === item.link
                        ? "bg-formPrimary text-white rounded-md py-3"
                        : ""
                    }`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="flex items-center gap-2 px-2 py-3 text-error text-sm"
              onClick={() => signOut()}
            >
              <SignOut size={20} />
              Logout
            </button>

            <div
              className="absolute -bottom-3 -right-5 flex items-center lg:hidden justify-center bg-formPrimary rounded-l-3xl p-3"
              onClick={toggleSidebar}
            >
              {showSider ? <EyeSlash size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;

// "use client";

// // Library import
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// // Icons
// import {
//   SquaresFour,
//   HandDeposit,
//   Package,
//   HandArrowDown,
//   Scroll,
//   GearSix,
//   Question,
//   SignOut,
//   Eye,
//   EyeSlash,
//   MagnifyingGlass,
//   Coins,
//   CaretUp,
//   CaretDown,
// } from "@phosphor-icons/react/dist/ssr";
// import { useState } from "react";

// const SideNavbar = ({ showSider, toggleSidebar }) => {
//   const pathname = usePathname();

//   const NavItems = [
//     {
//       name: "Overview",
//       icon: <SquaresFour size={20} />,
//       link: "/dashboard",
//     },
//     {
//       name: "Deposit",
//       icon: <HandDeposit size={20} />,
//       link: "/dashboard/deposit",
//     },
//   ];
//   const OtherNavItems = [
//     {
//       name: "Withdraw",
//       icon: <HandArrowDown size={20} />,
//       link: "/dashboard/withdrawal",
//     },
//     {
//       name: "Transaction History",
//       icon: <Scroll size={20} />,
//       link: "/dashboard/transaction_history",
//     },
//   ];
//   const PreferencesItems = [
//     {
//       name: "Settings",
//       icon: <GearSix size={20} />,
//       link: "/dashboard/settings",
//     },
//     {
//       name: "Help & Support",
//       icon: <Question size={20} />,
//       link: "/dashboard/support",
//     },
//   ];

//   const [showInvestmentDropdown, setShowInvestmentDropdown] = useState(false);
//   const handleShowInvestmentDropdown = () => {
//     setShowInvestmentDropdown(!showInvestmentDropdown);
//   };

//   return (
//     <nav className="bg-white text-primary w-full p-5 h-screen flex-shrink-0 shadow-sm relative space-y-10">
//       {/* Logo and Brand Name */}
//       <Link href={`/dashboard/overview`} className="flex items-center gap-1">
//         <Image
//           src={`/Images/BillionBe_Logo.svg`}
//           width={40}
//           height={40}
//           alt="BillionBe Logo"
//         />
//         <h1 className="lg:text-xl xl:text-2xl font-medium text-black">
//           BillionBe
//         </h1>
//       </Link>

//       {/* Nav item */}
//       <div className="space-y-5">
//         <h2 className="px-2 text-sm text-[#83899F]">Home</h2>
//         <ul className="text-black space-y-5">
//           {NavItems.map((item, index) => (
//             <li key={index}>
//               <Link
//                 href={item.link}
//                 className={`flex items-center gap-2 px-2 lg:text-xs xl:text-sm font-medium ${
//                   pathname === item.link
//                     ? "bg-formPrimary text-white rounded-md py-3 lg:py-2 xl:py-3 "
//                     : ""
//                 }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             </li>
//           ))}

//           {/* Investments and Packages */}
//           <li
//             className={`${
//               pathname === `/dashboard/packages/confirm` ||
//               pathname === `/dashboard/packages` ||
//               pathname === `/dashboard/investments` ||
//               showInvestmentDropdown
//                 ? "bg-[#F9F9F9] rounded-md px-3 py-3 lg:py-2 xl:py-3 "
//                 : ""
//             } space-y-5 cursor-pointer`}
//             onClick={handleShowInvestmentDropdown}
//           >
//             <span className={`flex items-center justify-between px-2`}>
//               <span
//                 className={`flex items-center gap-2 lg:text-xs xl:text-sm font-medium `}
//               >
//                 <Package size={20} />
//                 Investment
//               </span>

//               {showInvestmentDropdown ? (
//                 <CaretUp size={20} />
//               ) : (
//                 <CaretDown size={20} />
//               )}
//             </span>

//             {showInvestmentDropdown && (
//               <span className="px-3 block space-y-3 border-l-2 border-l-formPrimary">
//                 <span>
//                   <Link
//                     href={`/dashboard/packages/`}
//                     className={`flex items-center gap-2 px-2 py-3 lg:py-2 xl:py-3  lg:text-xs xl:text-sm font-medium ${
//                       pathname === `/dashboard/packages/confirm`
//                         ? "bg-formPrimary text-white rounded-md "
//                         : ""
//                     }  ${
//                       pathname === `/dashboard/packages`
//                         ? "bg-formPrimary text-white rounded-md "
//                         : ""
//                     }`}
//                   >
//                     Packages
//                   </Link>
//                 </span>

//                 <span>
//                   <Link
//                     href={`/dashboard/investments/`}
//                     className={`flex items-center gap-2 px-2 py-3 lg:py-2 xl:py-3  lg:text-xs xl:text-sm font-medium ${
//                       pathname === `/dashboard/investments`
//                         ? "bg-formPrimary text-white rounded-md "
//                         : ""
//                     }`}
//                   >
//                     Investments
//                   </Link>
//                 </span>
//               </span>
//             )}
//           </li>

//           {OtherNavItems.map((item, index) => (
//             <li key={index}>
//               <Link
//                 href={item.link}
//                 className={`flex items-center gap-2 px-2 lg:text-xs xl:text-sm font-medium ${
//                   pathname === item.link
//                     ? "bg-formPrimary text-white rounded-md py-3 lg:py-2 xl:py-3 "
//                     : ""
//                 }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex md:hidden items-center gap-2 p-3 bg-[#F7F9FC] rounded-md">
//         <MagnifyingGlass size={20} className="text-faded" />
//         <input
//           type="search"
//           className="bg-transparent outline-none border-none w-full"
//           name="search"
//           id="search"
//           placeholder="Search here..."
//         />
//       </div>

//       {/* Nav footer */}
//       <div className="absolute bottom-0 left-0 w-full p-5">
//         {/* Line */}
//         <div className="w-full h-[1px] bg-[#ced4da] px-5 mb-3"></div>

//         {/* Preferences */}
//         <div className="space-y-4 relative">
//           <h2 className="px-2 text-sm text-[#83899F]">Preferences</h2>
//           <div className="space-y-5">
//             <ul className="text-black space-y-5">
//               {PreferencesItems.map((item, index) => (
//                 <li key={index}>
//                   <Link
//                     href={item.link}
//                     className={`flex items-center gap-2 px-2 text-sm font-medium ${
//                       pathname === item.link
//                         ? "bg-formPrimary text-white rounded-md py-3"
//                         : ""
//                     }`}
//                   >
//                     {item.icon}
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             <button
//               type="button"
//               className="flex items-center gap-2 px-2 py-3 text-error text-sm"
//             >
//               <SignOut size={20} />
//               Logout
//             </button>

//             <div
//               className="absolute -bottom-3 -right-5 flex items-center lg:hidden justify-center bg-formPrimary rounded-l-3xl p-3"
//               onClick={toggleSidebar}
//             >
//               {showSider ? <EyeSlash size={20} /> : <Eye size={20} />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default SideNavbar;
