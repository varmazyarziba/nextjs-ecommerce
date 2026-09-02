"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/loginAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 ارسال کوکی HttpOnly
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.replace("/admin"); // replace برای جلوگیری از loop
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          ورود به پنل ادمین
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">ایمیل</label>
            <input
              type="email"
              id="email"
              placeholder="ایمیل خود را وارد کنید"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">رمز عبور</label>
            <input
              type="password"
              id="password"
              placeholder="رمز عبور خود را وارد کنید"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}