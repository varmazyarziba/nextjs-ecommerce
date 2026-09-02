"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpForm({ phone }) {
  const router = useRouter();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // فوکوس اولیه
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // تایمر
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function handleChange(value, index) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    newOtp.forEach((v, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = v;
      }
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 6) return;

    setLoading(true);

    const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
      method: "POST",
       credentials: "include", // ⭐ مهم
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.needRegister) {
      router.push("/auth?phone=" + phone);
    } else {
     document.cookie = `token=${data.token}; path=/; max-age=604800`;

      router.push("/");
    }
  }

  async function resendOtp() {
    await fetch("http://localhost:3000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    setTimer(60);
    setOtp(Array(6).fill(""));
    inputsRef.current[0]?.focus();
  }

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <p className="text-sm text-gray-600 text-center">
        کد ارسال شده به <span className="font-bold">{phone}</span>
      </p>

      <div
        className="flex justify-center gap-3"
        onPaste={handlePaste}
        dir="ltr"
      >
        {otp.map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            maxLength={1}
            className="
              w-12 h-12 text-center text-lg font-bold
              border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-[#CB2D58]
              transition
            "
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button
        disabled={loading}
        className="
          w-full bg-[#CB2D58] text-white py-3 rounded-lg
          hover:opacity-90 transition disabled:opacity-50
        "
      >
        {loading ? "در حال بررسی..." : "تایید کد"}
      </button>

      <div className="text-center text-sm text-gray-600">
        {timer > 0 ? (
          <span>ارسال مجدد تا {timer} ثانیه دیگر</span>
        ) : (
          <button
            type="button"
            onClick={resendOtp}
            className="text-[#CB2D58] hover:underline"
          >
            ارسال مجدد کد
          </button>
        )}
      </div>
    </form>
  );
}
