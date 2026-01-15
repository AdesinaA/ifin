"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import GeneralLoader from "@/components/GenreralLoader";
import Input from "@/components/Auth/Input";
import WithdrawalPageModal from "../modals/WithdrawalPageModal";
import BalanceInsufficientModal from "../modals/BalanceInsufficientModal";
import useToggle from "@/hooks/UseToggle";

const DashboardWithdrawal = ({ data }) => {
  const token = data.accessToken;

  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    recipientWallet: "",
  });

  const {
    isOpen: isConfirmOpen,
    toggle: toggleConfirmModal,
  } = useToggle();

  const {
    isOpen: isBalanceInsufficient,
    toggle: toggleBalanceInsufficientModal,
  } = useToggle();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableBalance = overviewData?.total_earnings || 0;

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/dashboard/overview/general_overview`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200 && res.data.status === 200) {
        setOverviewData(res.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReview = () => {
    if (Number(formData.amount) > availableBalance) {
      toggleBalanceInsufficientModal();
      return;
    }
    toggleConfirmModal();
  };

  const handleTransfer = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post(
        `/api/dashboard/withdraw`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res?.data?.data?.success) {
        setSuccess(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <GeneralLoader />;

  return (
    <>
      <div className="space-y-8 pt-3 pb-10 bg-greyBg">
        <PagesHeader
          heading="Transfers"
          des="Move funds securely from your account to an external destination."
        />

        {/* Balance Context */}
        <div className="bg-backgroundPrimary rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-grey">Available balance</p>
            <p className="text-xl font-semibold">
              {availableBalance} USDT
            </p>
          </div>
        </div>

        {/* Transfer Form */}
        <div className="bg-backgroundPrimary rounded-xl p-6 space-y-6 max-w-2xl">
          {/* FROM */}
          <div>
            <p className="text-xs text-grey mb-1">From</p>
            <div className="border rounded-lg px-4 py-3 bg-[#F9FAFB]">
              <p className="font-medium">Primary Wallet</p>
              <p className="text-xs text-faded">USDT balance</p>
            </div>
          </div>

          {/* TO */}
          <Input
            label="To (destination address)"
            name="recipientWallet"
            placeholder="Paste destination wallet address"
            onChange={handleChange}
          />

          {/* AMOUNT */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <div className="flex items-center border rounded-lg px-4 py-3 justify-between">
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                className="outline-none w-full"
                value={formData.amount}
                onChange={handleChange}
              />
              <button
                type="button"
                className="text-xs text-formPrimary font-medium"
                onClick={() =>
                  setFormData({
                    ...formData,
                    amount: availableBalance,
                  })
                }
              >
                Use full balance
              </button>
            </div>
          </div>

          {/* REVIEW */}
          <div className="border-t pt-4 space-y-2 text-sm text-grey">
            <div className="flex justify-between">
              <span>Processing fee</span>
              <span>0.00 USDT</span>
            </div>
            <div className="flex justify-between font-medium text-label">
              <span>Net transfer</span>
              <span>{formData.amount || 0} USDT</span>
            </div>
          </div>

          {/* ACTION */}
          <div className="pt-4">
            <button
              onClick={handleReview}
              disabled={!formData.amount || !formData.recipientWallet}
              className="w-full bg-formPrimary text-gold py-3 rounded-lg font-medium disabled:opacity-50"
            >
              Review transfer
            </button>
          </div>
        </div>
      </div>

      {isConfirmOpen && (
        <WithdrawalPageModal
          handleSubmit={handleTransfer}
          isSucces={success}
          isLoading={submitting}
          onClose={toggleConfirmModal}
        />
      )}

      {isBalanceInsufficient && (
        <BalanceInsufficientModal
          onClose={toggleBalanceInsufficientModal}
          withdrawal
        />
      )}
    </>
  );
};

export default DashboardWithdrawal;




/*"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import GeneralLoader from "@/components/GenreralLoader";
import TransactionTable from "../tables/TransactionTable";
import Input from "@/components/Auth/Input";
import WithdrawalPageModal from "../modals/WithdrawalPageModal";
import TransactionViewModal from "../modals/TransactionViewModal";
import BalanceInsufficientModal from "../modals/BalanceInsufficientModal";

import useToggle from "@/hooks/UseToggle";

import { CaretDown, Minus, Plus } from "@phosphor-icons/react/dist/ssr";

const DashboardWithdrawal = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "D7FwBx1nf96fqMP99X9x1eKmwWpXTu5DQu";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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

  const [openItems, setOpenItems] = useState(items.map((item) => false));

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => {
      const newOpenItems = [...prevOpenItems];

      if (newOpenItems[index]) {
        newOpenItems[index] = false;
      } else {
        newOpenItems.fill(false);
        newOpenItems[index] = true;
      }

      return newOpenItems;
    });
  };

  const transactions = [
    {
      id: "1",
      date: "2025-01-08 19:56:12",
      network: "Deposit",
      qty: 32.19,
      address: "DFXxMWpbzzJwzoAVqv5UttTRmWA7pFy2pmahwv2RRrLoL",
      txid: "5nBrhxPURreLyh3DFKuYUcNihFzb5U5FnovjUWG8yQS6KuLp7xSFc7tCA6pbF6tWHxVV1GCNDt64oZm8HBtgd9U",
      status: "Active",
    },
    {
      id: "2",
      date: "2025-01-05 19:09:42",
      network: "Investment",
      qty: 89.34,
      address: "D5XMWpbzzJwzoAVqv5UttTRmWA7pFy2pmahwv2RRrLoL",
      txid: "5nBrhxPURreLyh3DFKuYUcNihFzb5U5FnovjUWG8yQS6KuLp7xSFc7tCA6pbF6tWHxVV1GCNDt64oZm8HBtgd9U",
      status: "Active",
    },
    {
      id: "3",
      date: "2025-01-01 20:32:27",
      network: "Withdrawal",
      qty: 464.76,
      address: "D5XMWpbzzJwzoAVqv5UttTRmWA7pFy2pmahwv2RRrLoL",
      txid: "5nBrhxPURreLyh3DFKuYUcNihFzb5U5FnovjUWG8yQS6KuLp7xSFc7tCA6pbF6tWHxVV1GCNDt64oZm8HBtgd9U",
      status: "Failed",
    },
  ];

  const { isOpen: isModalOpen, toggle: toggleModal } = useToggle();

  const [selectedTx, setSelectedTx] = useState(null);

  const handleToggle = (id) => {
    if (id === null) {
      setSelectedTx(null);
      toggleModal();
      return;
    }

    const selectedTransaction = transactions.find((tx) => tx.id === id);
    setSelectedTx(selectedTransaction);
    toggleModal();
  };

  const [formData, setFormData] = useState({
    amount: "",
    recipientWallet: "",
  });
  
  const handleFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isOpen: isWarning, toggle: toggleWarningModal } = useToggle();

  const [overviewData, setOverviewData] = useState([]);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const available_amount = overviewData?.total_earnings;

  const fetchOverviewData = async () => {
    setOverviewLoading(true);
    const url = `/api/dashboard/overview/general_overview`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setOverviewLoading(false);
        if (response?.data.status === 200) {
          setOverviewData(response?.data?.data);
        } else {
          setOverviewData([]);
        }
      } else {
        setLoading(false);
        setOverviewData([]);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const {
    isOpen: isBalanceInsufficient,
    toggle: toggleBalanceInsufficientModal,
  } = useToggle();

  const [withdrawaLoading, setWithdrawalLoading] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);

  const token = data.accessToken;

  const handleWithdraw = async () => {
    if (overviewData?.total_earnings < formData?.amount) {
      toggleWarningModal();
      toggleBalanceInsufficientModal();
      return;
    }

    setWithdrawalLoading(true);

    const url = `/api/dashboard/withdraw`;
    let data = JSON.stringify(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("response", response.data.data);
      
  
      if (response.status === 200) {
        setWithdrawalLoading(false);
        if (response?.data.data.success === true) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
          return;
        }
      } else {
        setWithdrawalLoading(false);
        return;
      }

      return response.data;
    } catch (error) {
      setWithdrawalLoading(false);
      throw error;
    }
  };

  return (
    <>
      {overviewLoading ? (
        <GeneralLoader />
      ) : (
        <div
          className={`space-y-5 lg:pb-5 pt-3 scrollable-box ${
            isModalOpen || isWarning
              ? "h-[50vh] lg:h-screen overflow-hidden"
              : ""
          } bg-greyBg`}
        >
          <div>
            <PagesHeader
              heading="Withdraw Funds"
              des="Here's an overview of your portfolio today.."
            />
          </div>

         
          <div className="flex flex-col xl:flex-row items-start justify-between gap-10 spacey-10 md:space-y-0">
            <form className="bg-white p-5 rounded-xl space-y-10 w-full">
              <div className="space-y-5">
                <div className="space-y-1 cursor-not-allowed">
                  <label className="text-sm text-label">Coin</label>
                  <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center">
                    <Image
                      src={`/Images/DogeCoinLogo.svg`}
                      width={22}
                      height={22}
                      alt="USDT logo"
                    />
                    <p>USDT</p>
                    <p className="text-sm text-grey">USDT</p>
                  </div>
                </div>

                <div className="space-y-1 cursor-not-allowed">
                  <label className="text-sm text-label">Select Network</label>
                  <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center justify-between">
                    <p>USDT</p>
                    <CaretDown size={20} className="text-grey" />
                  </div>
                </div>

                <Input
                  label="Wallet Address"
                  type="text"
                  name="recipientWallet"
                  id="recipientWallet"
                  placeholder="Paste/Enter your USDT wallet address here"
                  onChange={handleFormInput}
                />

                <div className="mb-4">
                  <label className="block text-[#162844] mb-1">Amount</label>
                  <div
                    className={`w-full px-3 py-2 border border-borderColor
                     rounded-md focus:outline-none focus:ring-2 focus:ring-formPrimary flex justify-between items-center `}
                  >
                    <div className="flex gap-2 items-center">
                      <p className="font-bold text-sm">USDT</p>
                      <input
                        type="number"
                        name="amount"
                        id="amout"
                        placeholder="0.0"
                        onChange={handleFormInput}
                        className="bg-transparent outline-none"
                        value={formData.amount}
                      />
                    </div>

                    <div>
                      <button
                        type="button"
                        className="p-2 rounded-sm text-sm font-medium bg-[#EFF6FF]"
                        onClick={() =>
                          setFormData({ ...formData, amount: available_amount })
                        }
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <p className="text-faded">Available Amount</p>
                  <p className="font-medium">
                    $ {available_amount} worth of Usdt
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs">Total Amount</p>
                    <p className="font-medium">{available_amount} Usdt</p>
                    <p className="text-xs">Network Fee 0.0 Usdt</p>
                  </div>

                  <button
                    type="button"
                    className={` bg-formPrimary  font-medium
            text-white px-7 py-2 rounded-lg ${
              formData?.amount !== "" && formData?.wallet_address !== ""
                ? ""
                : "opacity-50 cursor-not-allowed"
            } transition-colors `}
                    disabled={
                      formData.amount === "" && formData?.wallet_address === ""
                    }
                    onClick={toggleWarningModal}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </form>

          </div>

        </div>
      )}

      {isBalanceInsufficient && (
        <BalanceInsufficientModal
          onClose={toggleBalanceInsufficientModal}
          withdrawal={true}
        />
      )}

      {isModalOpen && (
        <TransactionViewModal
          selectedTx={selectedTx}
          handleToggle={handleToggle}
        />
      )}

      {isWarning && (
        <WithdrawalPageModal
          handleSubmit={handleWithdraw}
          isSucces={isSucces}
          isLoading={withdrawaLoading}
          onClose={toggleWarningModal}
        />
      )}
    </>
  );
};

export default DashboardWithdrawal;
*/