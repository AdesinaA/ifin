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
          heading="Account"
          des="Manage your personal information, security, and account preferences."
          />

          </div>

          <div className="space-y-8 bg-greyBg">

          {/* PROFILE */}
                    <section className="bg-backgroundPrimary rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium">Profile</h3>
              <p className="text-sm text-grey">
                Your personal details used across the platform.
              </p>
            </div>

            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-grey">Name</span>
                <span className="font-medium text-[#101828]">
                  {userDetails?.name || "—"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Email</span>
                <span className="font-medium text-[#101828]">
                  {userDetails?.email || "—"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-grey">Account status</span>
                <span className="font-medium text-[#027A48]">Active</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={togglePersonalSettings}
                className="text-sm font-medium text-formPrimary"
              >
                Edit profile
              </button>
            </div>
          </section>


          {/* SECURITY */}
          <section className="bg-backgroundPrimary rounded-xl p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium">Security</h3>
            <p className="text-sm text-grey">
              Manage access, authentication, and account protection.
            </p>
          </div>

          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-grey">Password</span>
              <span className="font-medium text-[#101828]">••••••••</span>
            </div>

            <div className="flex justify-between">
              <span className="text-grey">Two-factor authentication</span>
              <span className="font-medium text-[#027A48]">Enabled</span>
            </div>

            <div className="flex justify-between">
              <span className="text-grey">Security status</span>
              <span className="font-medium text-[#101828]">Up to date</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={toggleSecuritySettings}
              className="text-sm font-medium text-formPrimary"
            >
              Manage security
            </button>
          </div>
        </section>


          {/* PREFERENCES */}
          <section className="bg-backgroundPrimary rounded-xl p-6 space-y-3">
            <div>
              <h3 className="text-sm font-medium">Preferences</h3>
              <p className="text-sm text-grey">
                Control how you receive notifications and updates.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <p className="text-sm text-[#475467]">
                Notification settings: <span className="font-medium">Custom</span>
              </p>
              <button
                className="text-sm font-medium text-formPrimary"
                // onClick={toggleNotificationSettings}
              >
                Manage
              </button>
            </div>
          </section>

          {/* WALLET */}
          <section className="bg-backgroundPrimary rounded-xl p-6 space-y-3">
            <div>
              <h3 className="text-sm font-medium">Connected wallets</h3>
              <p className="text-sm text-grey">
                Manage external addresses used for transfers.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <p className="text-sm text-[#475467]">
                Linked wallets: <span className="font-medium">1</span>
              </p>
              <button
                className="text-sm font-medium text-formPrimary"
                // onClick={toggleWithdrawalSettings}
              >
                Update
              </button>
            </div>
          </section>

          {/* LEGAL */}
          <section className="bg-backgroundPrimary rounded-xl p-6 space-y-3">
            <div>
              <h3 className="text-sm font-medium">Legal</h3>
              <p className="text-sm text-grey">
                Review terms of service and privacy policies.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <p className="text-sm text-[#475467]">
                Last updated: <span className="font-medium">01 Jan 2025</span>
              </p>
              <button
                className="text-sm font-medium text-formPrimary"
                // onClick={toggleLegalSettings}
              >
                View
              </button>
            </div>
          </section>


          <section className="border border-red-200 bg-red-50/30 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-red-700">Danger zone</h3>
              <p className="text-sm text-red-600">
                Actions in this section affect account access.
              </p>
            </div>

            <div className="border-t border-red-200 pt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-700">Sign out</p>
                  <p className="text-red-600 text-xs">
                    Ends your current session on this device.
                  </p>
                </div>

              </div>

              <div className="flex items-center justify-between opacity-60">
                <div>
                  <p className="font-medium text-red-700">Close account</p>
                  <p className="text-red-600 text-xs">
                    Permanently remove your account and data.
                  </p>
                </div>

                <button
                  disabled
                  className="text-sm font-medium text-red-700 cursor-not-allowed"
                >
                  Coming soon
                </button>
              </div>
            </div>
          </section>

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
