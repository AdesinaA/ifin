"use client";

// Library imports
import { useRef } from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import TestimonialCard from "../Cards/TestimonialCard";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      imgSrc: "/Images/image-12.svg",
      flag: "/Images/Flags.svg",
      name: "Sophia Lee",
      year: "2021",
      quote:
        "The comprehensive market analysis tools provided by the platform have been invaluable in making informed investment decisions",
    },
    {
      imgSrc: "/Images/image-12.svg",
      flag: "/Images/Flags.svg",
      name: "John Doe",
      year: "2022",
      quote: `I've seen significant growth in my portfolio since joining. The expert guidance and diverse investment options are top-notch`,
    },
    {
      imgSrc: "/Images/image-12.svg",
      flag: "/Images/Flags.svg",
      name: "Emma Wilson",
      year: "2020",
      quote:
        "The user-friendly interface and responsive customer support make managing investments a breeze",
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="space-y-20 pt-36 w-[90%] mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between gap-10 items-center">
        <div className="space-y-3 sm:space-y-5">
          {/* Header title */}
          <h2 className="uppercase">
            <span className="bg-[#EFF6FF] border border-primary rounded-[4px] py-1 px-3">
              Testimonials
            </span>
          </h2>

          <div className="space-y-2 sm:space-y-3">
            <span className="text-4xl font-medium">What Our Clients Say</span>
            <p className="text-sm sm:text-base md:text-lg">
              Hear from our satisfied investors about their experience with us
            </p>
          </div>
        </div>

        {/* Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="w-14 h-14 rounded-full border border-secondary flex items-center justify-center hover:bg-backgroundPrimary hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="w-14 h-14 rounded-full border border-secondary flex items-center justify-center hover:bg-backgroundPrimary hover:text-white transition-colors"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <Slider ref={sliderRef} {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
