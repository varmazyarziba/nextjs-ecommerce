"use client";

import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import SidebarTree from "./SidebarTree";

export default function CategoryFilter({
  categoryTree = [],
  currentPath = "",
}) {
  // در ابتدا بسته باشد
  const [isOpen, setIsOpen] = useState(false);

  // پیدا کردن آخرین دسته فعال
  const activeCategory = useMemo(() => {
    const findCategory = (items) => {
      for (const item of items) {
        if (item.fullPath === currentPath) {
          return item;
        }

        if (item.children?.length) {
          const found = findCategory(item.children);

          if (found) {
            return found;
          }
        }
      }

      return null;
    };

    return findCategory(categoryTree);
  }, [categoryTree, currentPath]);

  // مسیر والد دسته فعلی
  const parentPath = useMemo(() => {
    if (!activeCategory?.parent) {
      return "/";
    }

    const parentParts = currentPath
      .split("/")
      .filter(Boolean);

    parentParts.pop();

    return parentParts.length
      ? `/${parentParts.join("/")}`
      : "/";
  }, [activeCategory, currentPath]);

  return (
    <section className=" 
            mb-3
            w-full
            bg-white
            border
            border-gray-200
            rounded-md
            shadow-sm
            overflow-hidden
          ">
      {/* Header */}
      <div
        className="
          w-full
          flex
          items-center
          justify-between
          px-5
          py-3
          text-right
          bg-white
        "
      >
        {/* سمت راست */}
        <span className=" text-gray-800">
          دسته‌بندی‌ها
        </span>

        {/* سمت چپ */}
   



<div className="flex items-center">
  <div
    dir="ltr"
    className="
      group
      relative
      inline-flex
      items-center
      rounded-md
    "
  >
    {/* پس‌زمینه Hover */}
    <div
      className="
        absolute
        inset-0
        roundedr-sm
        
        bg-gray-200
        transition-colors
        duration-200
      "
    />

    {/* Title */}
    <span
      dir="rtl"
      className="
        relative
        z-10
        px-2
       
          h-6
        text-sm
        font-bold
        text-[#CB2D58]
        cursor-pointer
      "
    >
      {activeCategory.title}
    </span>

    {/* X */}
    <div
      className="
        absolute
        left-full
        top-1/2
        -translate-y-1/2
       roundedl-sm
        overflow-hidden
        w-0
        group-hover:w-7
group-hover:bg-gray-200
        transition-[width]
        duration-200
        ease-out

        z-10
      "
    >
      <Link
        href={parentPath}
        onClick={(e) => e.stopPropagation()}
        className="
          ml-1
          w-6
          h-6
          flex
          items-center
          justify-center
          rounded-full
          text-gray-600
          hover:text-red-600
        "
      >
        <X size={15} />
      </Link>
    </div>
  </div>
</div>







  {/* فلش */}
  <button
    type="button"
    onClick={() => setIsOpen((prev) => !prev)}
    aria-label="باز و بسته کردن دسته‌بندی‌ها"
    className="
      flex
      items-center
      justify-center
      w-6
      h-6
      rounded-full
      text-gray-500
      hover:bg-gray-100
      hover:text-[#CB2D58]
      transition
    "
  >
    <ChevronDown
      size={18}
      className={`
        transition-transform
        duration-300
        ${isOpen ? "rotate-180" : ""}
      `}
    />
  </button>
</div>
     

      {/* Category Tree */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${
            isOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-4 pb-4">
          <SidebarTree
            items={categoryTree}
            currentPath={currentPath}
          />
        </div>
      </div>
    </section>
  );
}