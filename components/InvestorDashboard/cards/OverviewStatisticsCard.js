import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

const OverviewStatisticsCard = ({
  heading,
  des,
  stat,
  accent, // "gold" | undefined
  children,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-navy/10 space-y-3">

      {/* Heading */}
      <p className="text-[11px] uppercase tracking-widest text-navyMuted">
        {heading}
      </p>

      {/* Value */}
      <div className="space-y-1">
        <div
          className={`flex items-end gap-1 font-semibold leading-none ${
            accent === "gold"
              ? "text-gold text-[34px]"
              : "text-navy text-[32px]"
          }`}
        >
          {des}
          {children && (
            <span className="text-xs uppercase text-navyMuted mb-1">
              {children}
            </span>
          )}
        </div>

        {/* Growth stat */}
        {stat && (
          <div className="flex items-center gap-1 text-xs text-navyMuted">
            <span className="flex items-center gap-0.5 text-gold font-medium">
              <ArrowUp size={12} />
              {stat}
            </span>
            vs last period
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewStatisticsCard;