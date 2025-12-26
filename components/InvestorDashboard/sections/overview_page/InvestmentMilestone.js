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
        {/* Investment Milestones */}
        {/* <div className="lg:w-[35%] w-full bg-greyBg space-y-1">
          <div className="bg-white rounded-tl-md rounded-tr-md py-2 px-5 h-[55px] flex items-center">
            <h2 className="text-sm">Upcoming Investment Milestones</h2>
          </div>

          <div className="h-[342px] overflow-scroll bg-white scrollable-box p-5 space-y-5 flex items-center justify-center">
            <p className="">Coming soon!</p>
            {milestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">{milestone.name}</h3>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Invested: ${milestone.invested.toLocaleString()}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Target: ${milestone.target.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-2 bg-[#E3F4F5] rounded-3xl">
                    <div
                      className="bg-formPrimary h-full rounded-3xl"
                      style={{
                        width: `${
                          (milestone.invested / milestone.target) * 100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <p className="text-[10px] text-muted-foreground text-grey">
                    {milestone.daysLeft} days left until maturity
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Recent transactionss */}
        <div className=" bg-greyBg overflow-scroll w-full space-y-1">
          {/* header */}
          <div
            className={`bg-white flex flex-col px-2 md:px-5 ${
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
            <div className="w-full overflow-x-auto bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
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
                      className="border-b border-gray-200 hover:bg-gray-50"
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
                                ? "bg-blue"
                                : "bg-red-500"
                            }`}
                          />
                          <span
                            className={`text-base ${
                              transaction.status === "confirmed"
                                ? "text-blue"
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
