"use client";

import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import AvailabilityFilter from "./AvailabilityFilter";

export default function CategorySidebar({
  categoryTree = [],
  currentPath = "",
  priceRange = { min: 0, max: 0 },
  onlyInStock = false,
  onPriceApply,
  onStockChange,
}) {
  return (
    <aside
      dir="rtl"
     className=" text-sm 
          "
    >
      <CategoryFilter
        categoryTree={categoryTree}
        currentPath={currentPath}
      />

      <PriceFilter
        min={priceRange.min}
        max={priceRange.max}
        onApply={onPriceApply}
      />

      <AvailabilityFilter
        value={onlyInStock}
        onChange={onStockChange}
      />
    </aside>
  );
}