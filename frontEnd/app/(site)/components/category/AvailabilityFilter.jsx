"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function AvailabilityFilter({
  value = false,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    const nextValue = !value;

    if (typeof onChange === "function") {
      onChange(nextValue);
    }
  };

  return (
    <div className=" w-full
            bg-white
            border
            border-gray-200
            rounded-md
            shadow-sm
            overflow-hidden">
      {/* عنوان */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          w-full
          flex
          items-center
          justify-between
          px-5
          py-3
          text-right
        "
      >
        <span className=" text-gray-800">
          وضعیت موجودی
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* محتوا */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-5">
          <button
            type="button"
            onClick={handleChange}
            className="
              w-full
              flex
              items-center
              gap-3
              text-right
              text-sm
              text-gray-700
              hover:text-[#CB2D58]
              transition
            "
          >
            <span
              className={`
                w-5
                h-5
                rounded
                border
                flex
                items-center
                justify-center
                shrink-0
                transition
                ${
                  value
                    ? "bg-[#CB2D58] border-[#CB2D58] text-white"
                    : "bg-white border-gray-300"
                }
              `}
            >
              {value && <Check size={14} />}
            </span>

            <span>فقط کالاهای موجود</span>
          </button>
        </div>
      </div>
    </div>
  );
}