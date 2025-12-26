const Statistics = () => {
  return (
    <div className="mt-16 sm:mt-20 md:mt-36 bg-secondary py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-5 text-center">
          {/* Header title */}
          <h2 className="uppercase">
            <span className="bg-white border border-white text-secondary rounded-[4px] py-1 px-3 text-sm sm:text-base">
              Statistics
            </span>
          </h2>

          <div className="space-y-2 sm:space-y-3 text-white">
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium">
              Trust By Numbers
            </span>
            <p className="text-sm sm:text-base md:text-lg max-w-md">
              Join our growing community of successful investors worldwide
            </p>
          </div>
        </div>

        <div className="w-full sm:w-4/5 md:w-3/5 mx-auto flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
          <StatItem number="3000+" text="Active members" />
          <Divider />
          <StatItem number="$3000000+" text="Total Investment" />
          <Divider />
          <StatItem number="98%" text="Client Satisfaction" />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ number, text }) => {
  return (
    <div className="space-y-1 text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-medium text-white">
        {number}
      </p>
      <p className="text-[#EFF6FF] text-sm sm:text-base md:text-lg">{text}</p>
    </div>
  );
};

const Divider = () => {
  return <div className="hidden sm:block h-16 w-px bg-white opacity-20"></div>;
};

export default Statistics;
