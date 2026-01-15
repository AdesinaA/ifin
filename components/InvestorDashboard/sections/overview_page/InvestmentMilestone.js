import Image from "next/image";

export default function InvestmentMilestones({ recentTransactions }) {
  const milestones = [
    {
      name: "BRZ-100",
      invested: 2500,
      target: 2800,
      daysLeft: 7,
    },
    {
      name: "BRZ-100",
      invested: 2500,
      target: 3400,
      daysLeft: 25,
    },
    {
      name: "BRZ-100",
      invested: 500,
      target: 800,
      daysLeft: 15,
    },
    {
      name: "BRZ-100",
      invested: 500,
      target: 800,
      daysLeft: 9,
    },
    {
      name: "BRZ-100",
      invested: 2500,
      target: 3600,
      daysLeft: 22,
    },
    {
      name: "BRZ-100",
      invested: 500,
      target: 1000,
      daysLeft: 11,
    },
  ];

  return (
    <div className="mx-auto space-y-6 mb-5">
      <div className="flex flex-col gap-5 lg:flex-row items-start md:gap-5 justify-between ">

        {/* Recent transactionss */}
        <div className=" bg-greyBg overflow-scroll w-full space-y-1">
          {/* header */}
          <div
            className={`bg-backgroundPrimary flex flex-col px-2 md:px-5 ${
              recentTransactions?.length === 0
                ? "md:h-[397px] py-5"
                : "md:h-[55px] md:flex-row justify-between gap-3 md:items-center  py-2"
            }  rounded-tl-md rounded-tr-md relative`}
          >
            <h2 className="text-sm">Recent Transactions</h2>

            {recentTransactions?.length === 0 && (
              <div className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                <div className="text-center space-y-2">
                  <Image
                    src="/Images/empty_state.svg"
                    alt="empty"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
                  <p>No activity yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          {recentTransactions?.length !== 0 && (
            <div className="w-full overflow-x-auto bg-backgroundPrimary">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-borderColor">
                    <th className="py-4 px-6 text-left text-base font-medium">
                      Date
                    </th>
                    <th className="py-4 px-6 text-left text-base font-medium">
                      Type
                    </th>
                    <th className="py-4 px-6 text-left text-base font-medium">
                      Description
                    </th>
                    <th className="py-4 px-6 text-left text-base font-medium">
                      Amount
                    </th>
                    <th className="py-4 px-6 text-left text-base font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions?.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b border-borderColor hover:bg-greyBg"
                    >
                      <td className="py-4 px-6 text-base text-[#666666]">
                        {new Date(transaction?.createdAt)
                          .toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\//g, "-")}
                      </td>
                      <td className="py-4 px-6 text-base text-[#666666] capitalize">
                        {transaction?.type}
                      </td>
                      <td className="py-4 px-6 text-base text-[#666666]">
                        {transaction?.description}
                      </td>
                      <td className="py-4 px-6 text-base text-[#666666]">
                        {transaction?.amount > 0 ? "+" : ""}
                        {Math.abs(transaction?.amount).toLocaleString()}
                        <span className="text-xs uppercase"> usdt</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              transaction.status === "confirmed"
                                ? "bg-formPrimary"
                                : "bg-red-500"
                            }`}
                          />
                          <span
                            className={`text-base ${
                              transaction.status === "confirmed"
                                ? "text-secondary"
                                : "text-red-500"
                            } capitalize`}
                          >
                            {transaction?.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
