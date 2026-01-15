"use client";

import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getNextFebruaryEnd = () => {
      const now = new Date();
      let year = now.getFullYear();
      const month = 1; // February (0-indexed)

      // If we're already past February, set for next year
      if (now > new Date(year, month + 1, 0)) {
        year++;
      }

      return new Date(year, month + 1, 0, 23, 59, 59).getTime();
    };

    const countdownDate = getNextFebruaryEnd();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = Math.max(0, countdownDate - now);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24)) + 2;
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-backgroundPrimary text-secondary py-2">
      <div className="w-[90%] mx-auto text-center text-sm md:text-base">
        <span className="">Launching in:</span>{" "}
        {String(timeLeft.days).padStart(2, "0")}d{" "}
        {String(timeLeft.hours).padStart(2, "0")}h{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m{" "}
        {String(timeLeft.seconds).padStart(2, "0")}s
      </div>
    </div>
  );
};

export default Countdown;
