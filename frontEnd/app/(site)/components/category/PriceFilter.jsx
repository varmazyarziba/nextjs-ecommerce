"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PriceFilter({
  min = 0,
  max = 0,
  onApply,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  useEffect(() => {
    setMinPrice(min);
    setMaxPrice(max);
  }, [min, max]);

  const formatPrice = (value) =>
    new Intl.NumberFormat("fa-IR").format(
      Number(value) || 0
    );

  const handleApply = () => {
    onApply?.({
      min: Number(minPrice),
      max: Number(maxPrice),
    });
  };

  return (
    <section className="border-b border-gray-200  mb-3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
        w-full
            bg-white
            border
            border-gray-200
            rounded-md
            shadow-sm
            overflow-hidden

         
          flex
          items-center
          justify-between
          px-5
          py-3
          text-right
          hover:bg-gray-50
          transition
        "
      >
        <span className=" text-gray-800">
          بر اساس قیمت
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              حداقل قیمت
            </label>

            <input
              type="number"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(Number(e.target.value))
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                outline-none
                focus:border-[#CB2D58]
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              حداکثر قیمت
            </label>

            <input
              type="number"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                outline-none
                focus:border-[#CB2D58]
              "
            />
          </div>

          <div className="text-center text-xs text-gray-500">
            {formatPrice(minPrice)} تومان
            <span className="mx-2">—</span>
            {formatPrice(maxPrice)} تومان
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="
              w-full
              bg-[#CB2D58]
              text-white
              rounded-lg
              py-2.5
              font-bold
              hover:bg-[#b5264d]
              transition
            "
          >
            صافی
          </button>
        </div>
      </div>
    </section>
  );
}