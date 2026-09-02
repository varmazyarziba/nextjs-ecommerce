import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-6">

      <Link
        href="/"
        className="hover:text-[#CB2D58] transition"
      >
        خانه
      </Link>

      {items.map((item, index) => {
        const href =
          "/" +
          items
            .slice(0, index + 1)
            .map((i) => i.slug)
            .join("/");

        return (
          <div
            key={item.slug}
            className="flex items-center gap-2"
          >
            <ChevronLeft
              size={16}
              className="text-gray-400"
            />

            <Link
              href={href}
              className={`transition hover:text-[#CB2D58] ${
                index === items.length - 1
                  ? "font-bold text-gray-800 pointer-events-none"
                  : ""
              }`}
            >
              {item.title}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}