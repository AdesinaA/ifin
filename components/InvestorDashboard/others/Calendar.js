"use client";

import { useState } from "react";

import {
  CaretDown,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

export default function Calendar({ onSelectDate, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

    const days = [];

    // Add previous month's days
    for (let i = 1; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, 1 - i);
      days.unshift({
        date: prevDate,
        isCurrentMonth: false,
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const formatDateString = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-backgroundPrimary rounded-[32px] shadow-lg p-6 w-[400px] font-[-apple-system]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[28px] font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <CaretDown size={25} className="text-formPrimary" />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="text-formPrimary hover:text-[#EFF6FF] transition-colors"
          >
            <CaretLeft size={25} />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="text-formPrimary hover:text-[#EFF6FF] transition-colors"
          >
            <CaretRight size={25} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-[2px]">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="h-12 flex items-center justify-center text-[15px] font-medium"
          >
            {day}
          </div>
        ))}

        {getDaysInMonth(currentDate).map((day, index) => {
          const dateString = formatDateString(day.date);
          const isSelected = selectedDate === dateString;

          return (
            <div
              key={index}
              className={`
                h-12 flex items-center justify-center
                ${day.isCurrentMonth ? "text-label" : "text-[#E5E5E5]"}
              `}
            >
              <button
                onClick={() => onSelectDate(dateString)}
                className={`
                  w-[46px] h-[46px] flex items-center justify-center
                  rounded-[16px] text-[17px] font-normal
                  ${isSelected ? "bg-[#1D4ED8] text-white" : "hover:bg-greyBg"}
                  transition-colors
                `}
              >
                {day.date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
