"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

// Components
import RefferalsTable from "../tables/RefferalsTable";
import GeneralLoader from "@/components/GenreralLoader";

// Icons
import { Copy } from "@phosphor-icons/react/dist/ssr";

const RefferalTableOption = ({ data, onCount }) => {
  const [isTransactionLoading, setTransactionLoading] = useState(false);
  const [Refferal, setRefferal] = useState([]);
  const token = data?.accessToken;
  const id = data?.user?.id;

  const fetchRecentRefferal = async () => {
    setTransactionLoading(true);
  
    try {
      const response = await axios.get(
        "/api/dashboard/refferals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const referrals = response?.data?.data?.referredUsers || [];
      setRefferal(referrals);

      // 🔥 SEND COUNT TO DASHBOARD
      if (onCount) onCount(referrals.length);
          } catch (error) {
      console.error("Referral fetch failed:", error);
      setRefferal([]);
    } finally {
      setTransactionLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentRefferal();
  }, []);

  return (
    <div
      className={`${
        isTransactionLoading || Refferal?.length === 0 ? "h-[80vh]" : ""
      }`}
    >
      {isTransactionLoading ? (
        <div className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <GeneralLoader />
        </div>
      ) : (
        <>
          {Refferal?.length === 0 ? (
            <div className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              <div className="text-center space-y-2">
                <Image
                  src="/Images/empty_state.svg"
                  alt="empty"
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <p className="font-medium">No referrals yet</p>
                  <p className="text-sm text-grey">
                    Share your referral link to start earning.
                  </p>

              <p className="text-sm text-grey">
                People you invite will appear here.
              </p>

              </div>
            </div>
          ) : (
            <div>
              <div className="bg-backgroundPrimary rounded-xl border">
              <div className="px-5 py-4 border-b">
                <h4 className="text-sm font-medium">Connections</h4>
                <p className="text-sm text-grey">
                  People who joined using your invite link.
                </p>
              </div>

  <RefferalsTable refferals={Refferal} />
</div>

            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RefferalTableOption;
