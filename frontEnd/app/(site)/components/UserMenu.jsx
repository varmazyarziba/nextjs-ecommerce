"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      {/* آیکون کاربر */}
      <div className="peer cursor-pointer">
        <User
          size={40}
          strokeWidth={1.5}
          className="text-black border border-gray-300 rounded-full p-2 hover:text-gray-400"
        />
      </div>

      {/* Dropdown */}
      <div
        className="
          absolute left-[16px] mt-2 w-48 text-gray-500 font-thin
          bg-white border border-gray-300 rounded-xl shadow-lg
          opacity-0 invisible
          peer-hover:opacity-100 peer-hover:visible
          hover:opacity-100 hover:visible
          transition-all duration-200
          z-50
        "
      >
        <Link href="/profile" className="block px-4 py-2 pt-5 hover:text-blue-500 text-sm">
          پیشخوان
        </Link>

        <Link href="/orders" className="block px-4 py-2 hover:text-blue-500 text-sm">
          سفارش‌ها
        </Link>

        <Link href="/downloads" className="block px-4 py-2 hover:text-blue-500 text-sm">
          دانلودها
        </Link>

        <Link href="/adress" className="block px-4 py-2 hover:text-blue-500 text-sm">
          آدرس ها
        </Link>

        <Link href="/waiting-list" className="block px-4 py-2 hover:text-blue-500 text-sm">
          لیست انتظار من
        </Link>

        <Link href="/mywallet" className="block px-4 py-2 hover:text-blue-500 text-sm">
          کیف پول من
        </Link>

        <Link href="/mywishlist" className="block px-4 py-2 hover:text-blue-500 text-sm">
          علاقه مندی
        </Link>

        <button
          onClick={logout}
          className="w-full text-right px-4 py-2 hover:text-blue-500 text-sm"
        >
          خروج
        </button>
      </div>
    </div>
  );
}
