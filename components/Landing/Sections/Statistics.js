const Statistics = () => {
  return (
    <section className="mt-24 md:mt-32 bg-navy py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-block text-xs tracking-widest uppercase
            border border-gold/40 text-gold px-3 py-1 rounded">
            Platform statistics
          </span>

          <h2 className="text-3xl sm:text-4xl font-medium text-white">
            Trust, measured in numbers
          </h2>

          <p className="text-white sm:text-base text-navyMuted max-w-xl mx-auto">
            System growth and usage metrics reflect real activity,
            not projected performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

          <StatItem
            number="3,000+"
            label="Active users"
          />

          <StatItem
            number="$3,000,000+"
            label="Total capital allocated"
          />

          <StatItem
            number="98%"
            label="User satisfaction rate"
          />

        </div>

        {/* Disclosure */}
        <p className="text-white text-navyMuted text-center max-w-3xl mx-auto">
          Metrics shown reflect platform usage and activity.
          Investment returns are governed by package rules, earning caps,
          and system-defined accrual logic.
        </p>

      </div>
    </section>
  );
};

const StatItem = ({ number, label }) => {
  return (
    <div className="space-y-2">
      <p className="text-4xl sm:text-5xl font-semibold text-gold">
        {number}
      </p>
      <p className="text-white sm:text-base text-navyMuted uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
};

export default Statistics;