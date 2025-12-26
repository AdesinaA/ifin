import Image from "next/image";

const TestimonialCard = ({ imgSrc, flag, name, year, quote }) => {
  return (
    <div className="space-y-3 px-2">
      {/* Images and Name */}
      <div
        className="h-[450px] w-full relative shadow-sm border border-secondary outline-none rounded-3xl"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%]
         mx-auto bg-white rounded-xl py-3 px-4 flex justify-between items-center"
        >
          <div>
            <h4 className="font-medium text-lg">{name}</h4>
            <p className="text-secondary -mt-1">Investor since {year}</p>
          </div>

          <div className="w-12 h-8 relative">
            <Image
              src={flag}
              alt="Background"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        </div>
      </div>

      <div className="px-5">
        <p>&quot;{quote}.&quot;</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
