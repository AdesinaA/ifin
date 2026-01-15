import Image from "next/image";

const TestimonialCard = ({ imgSrc, flag, name, year, quote }) => {
  return (
    <div className="space-y-4">
      {/* Image Card */}
      <div
        className="relative h-[450px] rounded-3xl overflow-hidden border border-navy"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Bottom Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] bg-navy/90 backdrop-blur rounded-xl px-4 py-3 flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gold text-lg">{name}</h4>
            <p className="text-textInverse/70 text-sm">
              Investor since {year}
            </p>
          </div>

          <div className="relative w-10 h-7 overflow-hidden rounded">
            <Image
              src={flag}
              alt="Country flag"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="px-3">
        <p className="text-sm text-textMuted italic leading-relaxed">
          “{quote}.”
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
