"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // اگر از checkout آمده باشد
  const redirect =
    searchParams.get("redirect") || "/";

  // -------------------------
  // States
  // -------------------------

  const [step, setStep] = useState("phone");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [isNewUser, setIsNewUser] =
    useState(false);

  const [timer, setTimer] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // -------------------------
  // Timer
  // -------------------------

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // -------------------------
  // Format Timer
  // -------------------------

  const formatTimer = () => {
    const min = String(
      Math.floor(timer / 60)
    ).padStart(2, "0");

    const sec = String(
      timer % 60
    ).padStart(2, "0");

    return `${min}:${sec}`;
  };

  // -------------------------
  // Send OTP
  // -------------------------

  const handleSendOTP = async () => {
    setError("");
    setSuccess("");

    const mobile = phone.replace(/\D/g, "");

    if (mobile.length !== 11) {
      setError("شماره موبایل معتبر نیست");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        {
          phone: mobile,
        },
        {
          withCredentials: true,
        }
      );

      setIsNewUser(res.data.isNewUser);

      setStep("otp");

      setTimer(120);

      setSuccess("کد تایید ارسال شد");

      console.log("OTP :", res.data.otp);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "خطا در ارسال کد"
      );

    } finally {

      setLoading(false);

    }
  };

  // -------------------------
  // Verify OTP
  // -------------------------

  const handleVerifyOTP = async () => {
    setError("");

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          phone,
          otp,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);

      login(token);

      router.replace(redirect);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "کد تایید اشتباه است"
      );

    } finally {

      setLoading(false);

    }
  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#CB2D58] px-8 py-8 text-white text-center">

          <h1 className="text-3xl font-bold">
            ورود | ثبت نام
          </h1>

          <p className="mt-2 text-sm text-pink-100">
            برای ادامه خرید وارد حساب کاربری شوید
          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
              {success}
            </div>
          )}

          {/* مرحله شماره موبایل */}

          {step === "phone" && (

            <>

              <label className="block mb-2 font-medium">
                شماره موبایل
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="09123456789"
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-[#CB2D58] outline-none"
              />

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="mt-6 w-full bg-[#CB2D58] hover:bg-[#b6274d] text-white rounded-xl py-4 font-bold transition disabled:opacity-50"
              >
                {loading
                  ? "در حال ارسال..."
                  : "دریافت کد تایید"}
              </button>

            </>

          )}

          {/* مرحله تایید */}

          {step === "otp" && (

            <>

              {isNewUser && (

                <div className="space-y-4 mb-5">

                  <input
                    type="text"
                    placeholder="نام"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-[#CB2D58] outline-none"
                  />

                  <input
                    type="text"
                    placeholder="نام خانوادگی"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-[#CB2D58] outline-none"
                  />

                </div>

              )}

              <label className="block mb-2 font-medium">
                کد تایید
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="123456"
                className="w-full border rounded-xl p-4 tracking-[8px] text-center text-xl focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-bold transition disabled:opacity-50"
              >
                {loading
                  ? "در حال بررسی..."
                  : "تایید و ورود"}
              </button>

              <div className="mt-5 text-center">

                {timer > 0 ? (

                  <p className="text-gray-500">

                    ارسال مجدد تا

                    <span className="mr-2 font-bold text-[#CB2D58]">

                      {formatTimer()}

                    </span>

                  </p>

                ) : (

                  <button
                    onClick={handleSendOTP}
                    className="text-[#CB2D58] hover:underline font-medium"
                  >
                    ارسال مجدد کد
                  </button>

                )}

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );
}