"use client";
import { useEffect, useState } from "react";

export default function BannerTimer() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let end = localStorage.getItem("bannerDiscountEnd");

    if (!end) {
      end = Date.now() + 300 * 60 * 60 * 1000; // 300 ساعت
      localStorage.setItem("bannerDiscountEnd", end);
    }

    const interval = setInterval(() => {
      const diff = Math.floor((end - Date.now()) / 1000);
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className=" text-gray-800 w-14 h-8 flex items-center justify-center font-bold text-lg">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-3 justify-end text-gray-500 mt-2">
        <Box value={seconds} label="ثانیه" />
        <Box value={minutes} label="دقیقه" />
         <Box value={hours} label="ساعت" />
      <Box value={days} label="روز" />
     
      
      
    </div>
  );
}
