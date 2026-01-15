"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// Components
import ProfileDropDown from "../dropdowns/ProfileDropDown";
import Notifications from "../dropdowns/Notifications";

// Hooks
import useToggle from "@/hooks/UseToggle";

// Icons
import { Bell, UserCircle } from "@phosphor-icons/react/dist/ssr";

const TopNavbar = ({ name, signOut, data }) => {
  const { isOpen: isProfileOpen, toggle: toggleProfile } = useToggle();
  const { isOpen: isNotificationsOpen, toggle: toggleNotifications } =
    useToggle();

  const [notificationsData, setNotificationsData] = useState([]);
  const token = data?.accessToken;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/dashboard/get-notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response?.data?.data?.length) {
        setNotificationsData(response.data.data);
      } else {
        setNotificationsData([]);
      }
    } catch {
      setNotificationsData([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const hasNotifications = notificationsData.length > 0;

  return (
    <header
      className="fixed top-0 right-0 z-40 w-full lg:w-4/5 2xl:w-[85%]
      bg-white border-b border-navy/10 px-4 md:px-6 h-14 flex items-center justify-end"
    >
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <button
          onClick={() => {
            toggleNotifications();
            toggleProfile(false);
          }}
          className="relative w-9 h-9 flex items-center justify-center rounded-md
          hover:bg-navySoft transition"
        >
          <Bell size={18} className="text-navyMuted" />

          {/* Gold indicator */}
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full" />
          )}
        </button>

        {isNotificationsOpen && (
          <Notifications
            onClose={toggleNotifications}
            notifications={notificationsData}
          />
        )}

        {/* Profile */}
        <button
          onClick={() => {
            toggleProfile();
            toggleNotifications(false);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-md
          hover:bg-navySoft transition"
        >
          <UserCircle size={20} className="text-navyMuted" />
        </button>

        {isProfileOpen && (
          <ProfileDropDown name={name} signOut={signOut} />
        )}
      </div>
    </header>
  );
};

export default TopNavbar;