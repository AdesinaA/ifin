"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

// Components
import RefferalsTable from "../tables/RefferalsTable";
import GeneralLoader from "@/components/GenreralLoader";

// Icons
import { Copy } from "@phosphor-icons/react/dist/ssr";

const RefferalTableOption = ({ data }) => {
  const [isTransactionLoading, setTransactionLoading] = useState(false);
  const [Refferal, setRefferal] = useState([]);
  const token = data?.accessToken;
  const id = data?.user?.id;

  const fetchRecentRefferal = async () => {
    setTransactionLoading(true);
    const url = `/api/dashboard/refferals`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
        ID: id,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setTransactionLoading(false);

        setRefferal(response?.data?.data?.referredUsers);
      } else {
        setTransactionLoading(false);
        setRefferal([]);
      }

      // return response.data;
    } catch (error) {
      throw error;
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
                <p>No refferals yet</p>
              </div>
            </div>
          ) : (
            <div>
              <RefferalsTable refferals={Refferal} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RefferalTableOption;
