import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

const OverviewStatisticsCard = ({
  heading,
  des,
  stat,
  invest,
  noBorder,
  children,
}) => {
  if (noBorder) {
    return (
      <div className={` p-5 space-y-3`}>
        <h3 className="text-sm">{heading}</h3>

        <div className="space-y-1">
          <span className="text-3xl font-medium flex gap-1 items-end">
            {des}
            <span className="text-sm uppercase">{children}</span>
          </span>
          {stat && (
            <span className="text-xs flex gap-1 items-center">
              <span className="flex items-center text-[#1D4ED8]">
                <ArrowUp size={10} />
                {stat}
              </span>
              vs last month
            </span>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${
        !invest ? "bg-white rounded-lg" : "border-l border-l-borderColor"
      } p-5 space-y-3`}
    >
      <h3 className="text-sm">{heading}</h3>

      <div className="space-y-1">
        <span className="text-3xl font-medium flex gap-1 items-end">
          {des}
          <span className="text-sm uppercase">{children}</span>
        </span>
        {stat && (
          <span className="text-xs flex gap-1 items-center">
            <span className="flex items-center text-[#1D4ED8]">
              <ArrowUp size={10} />
              {stat}
            </span>
            vs last month
          </span>
        )}
      </div>
    </div>
  );
};

export default OverviewStatisticsCard;
