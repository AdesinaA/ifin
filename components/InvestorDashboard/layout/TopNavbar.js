"use client";

// Library imports
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// Components
import ProfileDropDown from "../dropdowns/ProfileDropDown";
import Notifications from "../dropdowns/Notifications";

// Hooks
import useToggle from "@/hooks/UseToggle";

// Icons
import {
  MagnifyingGlass,
  Bell,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";

const TopNavbar = ({ name, signOut, data }) => {
  // Dropdowns
  const { isOpen: isProfileOpen, toggle: toggleProfile } = useToggle();
  const { isOpen: isNotificationsOpen, toggle: toggleNotifications } =
    useToggle();

  // Notifications data
  const [NotificationsData, setNotificationsData] = useState([]);

  const token = data?.accessToken;

  const fetchNotifications = async () => {
    const url = `/api/dashboard/get-notifications`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        if (response?.data?.data?.message !== "") {
          setNotificationsData(response?.data?.data);
        } else {
          setNotificationsData([]);
        }
      } else {
        setNotificationsData([]);
      }

      // return response.data;
    } catch (error) {
      setNotificationsData([]);
      throw error;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <nav
      className="bg-white py-2 px-2 md:px-5 fixed w-full lg:w-4/5 2xl:w-[85%] 
    flex justify-between lg:justify-end items-center z-50 shadow-sm"
    >
      <Link href={`/dashboard`} className="flex items-center gap-1 lg:hidden">
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

      {/* <div className="md:flex hidden items-center gap-2 p-3 bg-[#F7F9FC] rounded-md basis-1/2 2xl:2/5">
        <MagnifyingGlass size={20} />
        <input
          type="search"
          className="bg-transparent outline-none border-none w-full"
          name="search"
          id="search"
          placeholder="Search here..."
        />
      </div> */}

      <div className="flex gap-2 items-center float-right">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F7F9FC] cursor-pointer"
          onClick={() => {
            toggleNotifications();
            toggleProfile(false);
          }}
        >
          <Bell size={25} />

          {isNotificationsOpen && (
            <Notifications
              onClose={toggleNotifications}
              notifications={NotificationsData}
            />
          )}
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F7F9FC] relative cursor-pointer"
          onClick={() => {
            toggleNotifications(false);
            toggleProfile();
          }}
        >
          <UserCircle size={25} />

          {isProfileOpen && <ProfileDropDown name={name} signOut={signOut} />}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
