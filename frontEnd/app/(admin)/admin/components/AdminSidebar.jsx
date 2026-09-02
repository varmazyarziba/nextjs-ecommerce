"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Heart,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (key) => {
    setOpenMenu(openMenu === key ? null : key);
  };

  const menu = [
    { title: "داشبورد", href: "/admin", icon: LayoutDashboard },

    {
      title: "دسته بندی",
      icon: Package,
      key: "categories", // ✅ مهم
      children: [
        { title: "لیست دسته بندی", href: "/admin/categories" },
        { title: "افزودن دسته بندی", href: "/admin/categories/create" }, // اصلاح تایپو
      ],
    },

    {
      title: "محصولات",
      icon: Package,
      key: "products", // ✅ مهم
      children: [
        { title: "لیست محصولات", href: "/admin/products" },
        { title: "افزودن محصول", href: "/admin/products/create" },
      ],
    },

    { title: "سفارش‌ها", href: "/admin/orders", icon: ShoppingCart },
    { title: "کاربران", href: "/admin/users", icon: Users },
    { title: "علاقه‌مندی‌ها", href: "/admin/wishlist", icon: Heart },
    { title: "تنظیمات", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-l relative">
      <div className="p-5 font-bold text-xl border-b">پنل مدیریت</div>

      <nav className="p-3 space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;

          // اگر زیرمنو دارد
          if (item.children) {
            const isOpen = openMenu === item.key;

            return (
              <div key={item.key}>
                <button
                  onClick={() => toggleMenu(item.key)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.title}
                  </div>

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mr-6 mt-1 space-y-1">
                    {item.children.map((sub) => {
                      const active = pathname === sub.href;

                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block p-2 rounded-lg text-sm transition ${
                            active
                              ? "bg-[#CB2D58] text-white"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // آیتم معمولی
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                active ? "bg-[#CB2D58] text-white" : "hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-3 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            router.replace("/admin/login");
          }}
          className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full p-3 rounded-lg"
        >
          <LogOut size={18} />
          خروج
        </button>
      </div>
    </aside>
  );
}