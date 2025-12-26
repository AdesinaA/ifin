"use client";

// Library imports
import axios from "axios";
import { useState, useEffect } from "react";

// Component & Hooks
import useToggle from "@/hooks/UseToggle";
import LegalModal from "../modals/LegalModal";
import GeneralLoader from "@/components/GenreralLoader";
import WithdrawalWallet from "../modals/WithdrawalWallet";
import NotificationsModal from "../modals/NotificationsModal";
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import PersonalSettingsModal from "../modals/PersonalSettingsModal";
import PasswordSettingsModal from "../modals/PasswordSettingsModal";

const DashboardSettings = ({ data }) => {
  // Personal settings
  const {
    isOpen: isPersonalSettingsModalOpen,
    toggle: togglePersonalSettings,
  } = useToggle();

  //   Security settings
  const {
    isOpen: isSecuritySettingsModalOpen,
    toggle: toggleSecuritySettings,
  } = useToggle();

  //   Notifications settingss
  const {
    isOpen: isNotificationSettingsModalOpen,
    toggle: toggleNotificationSettings,
  } = useToggle();

  //   Withdrawal settingss
  const {
    isOpen: isWithdrawalSettingsModalOpen,
    toggle: toggleWithdrawalSettings,
  } = useToggle();

  //   Legal settingss
  const { isOpen: isLegalSettingsModalOpen, toggle: toggleLegalSettings } =
    useToggle();

  const [loading, setLoading] = useState(false);
  const token = data?.accessToken;
  const [userDetails, setUserDetails] = useState([]);

  const fetchUserDetails = async () => {
    setLoading(true);
    const url = `/api/dashboard/get-user-details`;

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
        setLoading(false);
        if (response?.data?.data?.message !== "") {
          setUserDetails(response?.data?.data?.user);
        } else {
          setLoading(false);
          setUserDetails([]);
        }
      } else {
        setLoading(false);
        setUserDetails([]);
      }

      // return response.data;
    } catch (error) {
      setUserDetails([]);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <GeneralLoader />
      ) : (
        <div
          className={`space-y-10 md:space-y-5 lg:pb-5 pt-3 scrollable-box  ${
            isPersonalSettingsModalOpen ||
            isSecuritySettingsModalOpen ||
            isWithdrawalSettingsModalOpen ||
            isLegalSettingsModalOpen ||
            isNotificationSettingsModalOpen
              ? "h-[50vh] lg:h-screen overflow-hidden"
              : ""
          } bg-greyBg`}
        >
          {/* Header */}
          <div>
            <PagesHeader
              heading="Settings"
              des="Customize your preferences, manage your account, and access support or legal information"
            />
          </div>

          {/* Content */}
          <div className="bg-white py-10 px-7 rounded-2xl space-y-10">
            {/* Personal */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Text content */}
              <div>
                <h3 className="font-medium">Personal Settings</h3>
                <p className="text-faded text-sm">
                  Enter your personal details as it appears on your
                  identification documents.
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-between md:justify-normal items-center gap-3 text-sm">
                <p>Profile: Completed</p>
                <button
                  type="button"
                  className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer"
                  onClick={togglePersonalSettings}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Text content */}
              <div>
                <h3 className="font-medium">Security</h3>
                <p className="text-faded text-sm">
                  Manage your password, enable 2FA, and monitor recent login
                  activities for a secure account.
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-between md:justify-normal items-center gap-3 text-sm">
                <p>2FA: Enabled</p>
                <button
                  type="button"
                  className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer"
                  onClick={toggleSecuritySettings}
                >
                  Manage
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Text content */}
              <div>
                <h3 className="font-medium">Notification</h3>
                <p className="text-faded text-sm">
                  Control how you receive alerts about transactions, updates,
                  and promotions.
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-between md:justify-normal items-center gap-3 text-sm">
                <p>Notifications: Custom</p>
                <button
                  type="button"
                  className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer"
                  // onClick={toggleNotificationSettings}
                >
                  Manage
                </button>
              </div>
            </div>

            {/* Wallet */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Text content */}
              <div>
                <h3 className="font-medium">Wallet</h3>
                <p className="text-faded text-sm">
                  Link external wallets, manage crypto addresses, and configure
                  your withdrawal preferences.
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-between md:justify-normal items-center gap-3 text-sm">
                <p>Linked wallet(s): 1</p>
                <button
                  type="button"
                  className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer"
                  // onClick={toggleWithdrawalSettings}
                >
                  Update
                </button>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Text content */}
              <div>
                <h3 className="font-medium">Legal (Terms & Privacy policy)</h3>
                <p className="text-faded text-sm">
                  Review our terms of service and privacy policy to understand
                  how we handle your data
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-between md:justify-normal items-center gap-3 text-sm">
                <p>Last Updated: 01-01-2025</p>
                <button
                  type="button"
                  className="w-[90px] bg-formPrimary text-white rounded-lg py-2 text-center cursor-pointer"
                  // onClick={toggleLegalSettings}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPersonalSettingsModalOpen && (
        <PersonalSettingsModal
          onClose={togglePersonalSettings}
          initialData={userDetails}
          token={token}
        />
      )}

      {isSecuritySettingsModalOpen && (
        <PasswordSettingsModal onClose={toggleSecuritySettings} token={token} />
      )}

      {isWithdrawalSettingsModalOpen && (
        <WithdrawalWallet onClose={toggleWithdrawalSettings} />
      )}

      {isLegalSettingsModalOpen && <LegalModal onClose={toggleLegalSettings} />}

      {isNotificationSettingsModalOpen && (
        <NotificationsModal onClose={toggleNotificationSettings} />
      )}
    </>
  );
};

export default DashboardSettings;
